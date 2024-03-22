import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PanierProduit } from 'src/typeorm/entities/PanierProduit';
import { Produit } from 'src/typeorm/entities/Produit';
import { CreatePanierProduitParams, UpdatePanierProduitParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class PanierProduitsService {
    constructor (@InjectRepository (PanierProduit) private panierProduitRepository: Repository<PanierProduit>, @InjectRepository (Produit) private produitRepository: Repository<Produit>) {}

    getPanierProduits () {
        return this.panierProduitRepository.find();
    }

    async getPanierProduit (id: number) {
        return await this.panierProduitRepository.findOne({
            where: { id },
            relations: ['produit', 'panier']
        })
    }

    async createPanierProduit (panierProduitDetails: CreatePanierProduitParams) {

        const newPanierProduit = this.panierProduitRepository.create(panierProduitDetails);

        const { produitId, quantite } = panierProduitDetails;
        
        const produit = await this.produitRepository.findOne({ where: {id: produitId} });
        produit.quantite -= quantite;

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();

        const date = new Date(year, month - 1, day);

        produit.dateUp = date;

        try {
            await this.panierProduitRepository.save(newPanierProduit);

            await this.produitRepository.save(produit);

            return newPanierProduit;
        } catch (error) {
            return error.message;
        }
    }

    async updatePanierProduit (id: number, panierProduitDetails: UpdatePanierProduitParams) {

        const panierProduit = this.panierProduitRepository.findOne({where: { id }});

        if (panierProduit) {
            const { produitId, quantite: quantiteNouveau } = panierProduitDetails;
            const { quantite: quantiteAncien } = await panierProduit;

            let quantiteReel = quantiteNouveau - quantiteAncien;
            let nouveauQuantiteProduit = Math.abs(quantiteNouveau - quantiteAncien);

            const produit = await this.produitRepository.findOne({ where :{ id: produitId } });

            switch (true) {
                case (quantiteReel > 0): //Quantitenouveau plus grand que quantite ancien
                    produit.quantite -= nouveauQuantiteProduit;
                break;
                case (quantiteReel == 0): //Equivaux

                    break;
                case (quantiteReel < 0): //Quantite nouveau plus petit que ancien
                        produit.quantite += nouveauQuantiteProduit;
                    break;
            }

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
    
            const date = new Date(year, month - 1, day);

            produit.dateUp = date;

            await this.panierProduitRepository.update({ id }, { updatedAt: new Date(), ...panierProduitDetails });

            await this.produitRepository.save(produit);
            return panierProduit;
        } else {
            throw new HttpException('Panier Produit non trouvé', HttpStatus.BAD_REQUEST);
        }
    }

    async deletePanierProduit (id: number) {
        const panierProduit = await this.panierProduitRepository.findOne({where: { id }});

        if (panierProduit) {

            const { quantite: panierQuantite, produitId } = panierProduit; 

            const produit = await this.produitRepository.findOne({where : { id: produitId} });
            produit.quantite += panierQuantite;
            await this.produitRepository.save(produit);

            await this.panierProduitRepository.delete(id);
            return panierProduit;
        } else {
            throw new HttpException('Panier Produit non trouvé', HttpStatus.BAD_REQUEST);
        }
    }
}

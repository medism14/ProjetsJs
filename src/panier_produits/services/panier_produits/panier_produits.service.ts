import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PanierProduit } from 'src/typeorm/entities/PanierProduit';
import { CreatePanierProduitParams, UpdatePanierProduitParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class PanierProduitsService {
    constructor (@InjectRepository (PanierProduit) private panierProduitRepository: Repository<PanierProduit>) {}

    getPanierProduits () {
        return this.panierProduitRepository.find();
    }

    async getPanierProduit (id: number) {
        return await this.panierProduitRepository.findOne({
            where: { id },
            relations: ['produit', 'panier']
        })
    }

    createPanierProduit (panierProduitDetails: CreatePanierProduitParams) {

        const newPanierProduit = this.panierProduitRepository.create(panierProduitDetails);

        return this.panierProduitRepository.save(newPanierProduit);
    }

    async updatePanierProduit (id: number, panierProduitDetails: UpdatePanierProduitParams) {

        const panierProduit = this.panierProduitRepository.findOne({where: { id }});

        if (panierProduit) {
            await this.panierProduitRepository.update({ id }, { updatedAt: new Date()});
            await this.panierProduitRepository.update({ id }, { ...panierProduitDetails });
            return panierProduit;
        } else {
            throw new HttpException('Panier Produit non trouvé', HttpStatus.BAD_REQUEST);
        }
    }

    async deletePanierProduit (id: number) {
        const panierProduit = await this.panierProduitRepository.findOne({where: { id }});

        if (panierProduit) {
            await this.panierProduitRepository.delete(id);
            return panierProduit;
        } else {
            throw new HttpException('Panier Produit non trouvé', HttpStatus.BAD_REQUEST);
        }
    }
}

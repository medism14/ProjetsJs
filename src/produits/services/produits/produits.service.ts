import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from 'src/typeorm/entities/Produit';
import { CreateProduitParams, UpdateProduitParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProduitsService {

    constructor(@InjectRepository (Produit) private produitRepository: Repository<Produit>) {}

    getProduits () {
        return this.produitRepository.find();
    }

    getProduct (id: number) {
        return this.produitRepository.findOne({
            where: { id },
            relations: ['categorie', 'panierProduit']
        });
    }

    createProduct (produitDetails: CreateProduitParams) {
        const newProduct = this.produitRepository.create(produitDetails);
        return this.produitRepository.save(newProduct);
    }

    async updateProduct (id: number, produitDetails: UpdateProduitParams) {

        const produit = await this.produitRepository.findOne({ where: { id } });

        if (produit) {
            await this.produitRepository.update({ id }, { updatedAt: new Date() });
            await this.produitRepository.update({ id }, { ...produitDetails });
            return produit;
        } else {
            throw new HttpException('Produit non trouvé', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteProduct (id: number) {
        const produit = await this.produitRepository.findOne({ where: { id } });

        if (produit) {
            this.produitRepository.delete(id);

            return produit;
        } else {
            throw new HttpException('Produit non trouvé', HttpStatus.BAD_REQUEST);
        }
    }
}

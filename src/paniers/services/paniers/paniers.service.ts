import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Panier } from 'src/typeorm/entities/Panier';
import { CreatePanierParams, UpdatePanierParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class PaniersService {
    constructor (@InjectRepository (Panier) private panierRepository: Repository<Panier>) {}

    getPaniers () {
        return this.panierRepository.find();
    }

    getPanier (id: number) {
        return this.panierRepository.findOne({
            where: { id },
            relations: ['user', 'panierProduits']
        })
    }

    createPanier (panierDetails: CreatePanierParams) {

        const newPanier = this.panierRepository.create(panierDetails);

        return this.panierRepository.save(newPanier);
    }

    async updatePanier (id: number, panierDetails: UpdatePanierParams) {

        const panier = this.panierRepository.findOne({where: { id }});

        if (panier) {
            await this.panierRepository.update({ id }, { updatedAt: new Date()});

            await this.panierRepository.update({ id }, { ...panierDetails });

            return panier;
        } else {
            throw new HttpException('Panier non trouvé', HttpStatus.BAD_REQUEST);
        }
    }

    async deletePanier (id: number) {
        const panier = await this.panierRepository.findOne({where: { id }});

        if (panier) {
            await this.panierRepository.delete(id);
            return panier;
        } else {
            throw new HttpException('Panier non trouvé', HttpStatus.BAD_REQUEST);
        }
    }
}

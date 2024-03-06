import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorie } from 'src/typeorm/entities/Categorie';
import { CreateCategorieParams, UpdateCategorieParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor (@InjectRepository (Categorie) private categorieRepository: Repository<Categorie>) {}

    findCategories () {
        return this.categorieRepository.find();
    }

    getCategorie(id: number) {
        return this.categorieRepository.findOne({
            where: { id },
            relations: ['produits']
        });
    }

    createCategorie (createCategorieDetails: CreateCategorieParams) {
        const newCategorie = this.categorieRepository.create(createCategorieDetails);
        return this.categorieRepository.save(newCategorie);
    }

    async updateCategorie (id: number, updateCategorieDetails: UpdateCategorieParams) {

        const categorie = await this.categorieRepository.findOne({ where: { id } });

        if (categorie) {
            await this.categorieRepository.update({ id }, { updatedAt: new Date() });

            await this.categorieRepository.update({ id }, { ...updateCategorieDetails });

            return categorie;
        } else {
            throw new HttpException('Categorie non trouvé', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteCategorie (id: number) {
        const categorie = await this.categorieRepository.findOne({ where: { id } });

        if (categorie) {
            await this.categorieRepository.delete(id);

            return categorie;
        } else {
            throw new HttpException('Categorie non trouvé', HttpStatus.BAD_REQUEST);
        }
    }
}

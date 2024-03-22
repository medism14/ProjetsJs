import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { PaniersService } from 'src/paniers/services/paniers/paniers.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor (@InjectRepository (User) private userRepository: Repository<User>) {}

    findUsers () {
        return this.userRepository.find();
    }

    getUser (id: number) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['panier.panierProduits.produit']
        });
    }

    async register (userDetails: CreateUserParams) {
        const newUser = this.userRepository.create(userDetails);

        const createPanierDto = {
            userId: newUser.id,
        };

        return this.userRepository.save(newUser);
    }

    async updateUser (id:number, updateUserDetails: UpdateUserParams) {
        const user = await this.userRepository.findOne({where: { id }});

        if (!user) {
            throw new HttpException('Utilisateur non trouvé', HttpStatus.BAD_REQUEST);
        }

        if (updateUserDetails.password) {
            updateUserDetails.password = await bcrypt.hash(updateUserDetails.password, 10);
        }

        await this.userRepository.update({id}, { ...updateUserDetails, updatedAt: new Date() });

        return user;
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findOne({where: { id }});

        if (user) {
            return this.userRepository.delete({ id });
            return user;
        } else {
            throw new HttpException('Produit non trouvé', HttpStatus.BAD_REQUEST);
        }
    }
}

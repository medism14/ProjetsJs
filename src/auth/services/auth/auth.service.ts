import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserParams } from 'src/utils/types';
import { User } from 'src/typeorm/entities/User';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository (User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        let hashedPassword = user.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            throw new Error("Le mot de passe ne matche pas");
        }

        return user;
    }

    async login(email: string, password: string) {
        try {
            let user = await this.validateUser(email, password);
            const token = await this.generateToken(user);

            if (user) {
                const id: number = user.id;
                user = await this.userRepository.findOne({
                    where: { id },
                    relations: ['panier.panierProduits.produit']
                });
            }

            return { token, user };
        } catch (error) {
            throw new Error(error);
        }
    }

    async generateToken(user: any) {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }

    async register(userDetails: CreateUserParams) {
        try {
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(userDetails.password, saltOrRounds);
            const userDetail = {
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                role: 1,
                email: userDetails.email,
                password: hashedPassword,
            };

            const newUser = this.userRepository.create(userDetail);
            var savedUser = await this.userRepository.save(newUser);

                const id: number = savedUser.id;
                let user = await this.userRepository.findOne({
                    where: { id },
                    relations: ['panier.panierProduits.produit']
                });


            if (savedUser) {
                const token = this.generateToken(savedUser);
                return { token, user };
            }
            
        } catch (error) {
            throw new Error("L'email existe déjà");
        }

        throw new Error("Erreur lors de l'enregistrement de l'utilisateur");
    }
}

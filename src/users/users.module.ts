import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { PaniersService } from '../paniers/services/paniers/paniers.service'; // Importez le service des paniers
import { Panier } from 'src/typeorm/entities/Panier'; // Importez l'entité du panier

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Panier]), // Importez les entités User et Panier
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PaniersService, // Ajoutez PaniersService en tant que fournisseur
  ],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { PaniersController } from './controllers/paniers/paniers.controller';
import { PaniersService } from './services/paniers/paniers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panier } from 'src/typeorm/entities/Panier';
import { Produit } from 'src/typeorm/entities/Produit';
import { ProduitsService } from 'src/produits/services/produits/produits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Panier, Produit])],
  controllers: [PaniersController],
  providers: [PaniersService, ProduitsService]
})
export class PaniersModule {}

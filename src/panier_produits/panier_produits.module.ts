import { Module } from '@nestjs/common';
import { PanierProduitsController } from './controllers/panier_produits/panier_produits.controller';
import { PanierProduitsService } from './services/panier_produits/panier_produits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanierProduit } from 'src/typeorm/entities/PanierProduit';
import { Produit } from 'src/typeorm/entities/Produit';

@Module({
  imports: [TypeOrmModule.forFeature([PanierProduit, Produit])],
  controllers: [PanierProduitsController],
  providers: [PanierProduitsService]
})
export class PanierProduitsModule {}

import { Module } from '@nestjs/common';
import { ProduitsController } from './controllers/produits/produits.controller';
import { ProduitsService } from './services/produits/produits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from 'src/typeorm/entities/Produit';

@Module({
  imports: [TypeOrmModule.forFeature([Produit])],
  controllers: [ProduitsController],
  providers: [ProduitsService]
})
export class ProduitsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './typeorm/entities/User';
import { Categorie } from './typeorm/entities/Categorie';
import { Produit } from './typeorm/entities/Produit';
import { Panier } from './typeorm/entities/Panier';

import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProduitsModule } from './produits/produits.module';
import { PaniersModule } from './paniers/paniers.module';
import { PanierProduitsModule } from './panier_produits/panier_produits.module';
import { PanierProduit } from './typeorm/entities/PanierProduit';
import { AuthModule } from './auth/auth.module';

@Module({
        imports: [
          TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'projetjs',
            entities: [User, Categorie, Produit, Panier, PanierProduit],
            synchronize: true,
          }),
          UsersModule,
          CategoriesModule,
          ProduitsModule,
          PaniersModule,
          PanierProduitsModule,
          AuthModule
        ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

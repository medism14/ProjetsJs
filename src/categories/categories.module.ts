import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';
import { Categorie } from 'src/typeorm/entities/Categorie';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Categorie])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}

import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateCategorieDto } from 'src/categories/dtos/CreateCategorie.dto';
import { UpdateCategorieDto } from 'src/categories/dtos/UpdateCategorie.dto';
import { CategoriesService } from 'src/categories/services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor (private categorieService: CategoriesService) {}

    @Get()
    async getCategories () {
        return await this.categorieService.findCategories();
    }

    @Get(':id')
    async getCategorie(@Param('id', ParseIntPipe) id: number) {
        return this.categorieService.getCategorie(id);
    }

    @Post()
    async createCategorie (@Body() createCategorieDto: CreateCategorieDto) {
        return await this.categorieService.createCategorie(createCategorieDto);
    }

    @Put(':id')
    async updateCategorie (
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategorie: UpdateCategorieDto
    ) {
        return await this.categorieService.updateCategorie(id, updateCategorie);
    }

    @Delete(':id')
    async deleteCategorie(@Param('id', ParseIntPipe) id: number) {
        return await this.categorieService.deleteCategorie(id);
    }
}

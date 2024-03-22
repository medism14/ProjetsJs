import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { CreateCategorieDto } from 'src/categories/dtos/CreateCategorie.dto';
import { UpdateCategorieDto } from 'src/categories/dtos/UpdateCategorie.dto';
import { CategoriesService } from 'src/categories/services/categories/categories.service';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
    constructor (private categorieService: CategoriesService) {}

    @Get()
    async getCategories (@Query('page') page: number = 1) {
        const limit: number = 5;
        return await this.categorieService.findCategories(page, limit);
    }

    @Get('All')
    async getAll () {
        return await this.categorieService.getAll();
    }

    @Get(':id')
    async getCategorie(@Param('id', ParseIntPipe) id: number) {
        return this.categorieService.getCategorie(id);
    }

    @Post()
    async createCategorie (@Body() createCategorieDto: CreateCategorieDto, @Res() res: Response) {
        try{
            await this.categorieService.createCategorie(createCategorieDto);
            return res.status(200).json({message: 'cbon'});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    @Put(':id')
    async updateCategorie (
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategorie: UpdateCategorieDto,
        @Res() res: Response
    ) {
        try{
            await this.categorieService.updateCategorie(id, updateCategorie);
            return res.status(200).json({message: 'cbon'});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    @Delete(':id')
    async deleteCategorie(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try{
            await this.categorieService.deleteCategorie(id);
            return res.status(200).json({message: 'cbon'});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Res, Query } from '@nestjs/common';
import { CreateProduitDto } from 'src/produits/dtos/CreateProduit.dto';
import { UpdateProduitDto } from 'src/produits/dtos/UpdateProduit.dto';
import { ProduitsService } from 'src/produits/services/produits/produits.service';
import { Response } from 'express';

@Controller('produits')
export class ProduitsController {

    constructor (private produitsService: ProduitsService) {}

    @Get()
    async getProducts (@Query('page') page: number = 1) {
        const limit = 5;
        return await this.produitsService.getProduits(page, limit);
    }

    @Get(':id')
    async getProduct (@Param('id', ParseIntPipe) id: number) {
        return await this.produitsService.getProduct(id);
    }

    @Post()
    async createProduct (@Body() createProduitDto: any, @Res() res: Response) {
        try{
            let product =  await this.produitsService.createProduct(createProduitDto);
            return res.status(200).json({product});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    @Put(':id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProduitDto: any, @Res() res: Response) {
        try {
            await this.produitsService.updateProduct(id, updateProduitDto);
            return res.json(200).json({message: 'cbon'});
        } catch (error) {
            return res.json(500).json({message: error.message})
        }
    }

    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            await this.produitsService.deleteProduct(id);
            return res.status(200).json({message: 'cbon'});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

}

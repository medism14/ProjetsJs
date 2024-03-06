import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProduitDto } from 'src/produits/dtos/CreateProduit.dto';
import { UpdateProduitDto } from 'src/produits/dtos/UpdateProduit.dto';
import { ProduitsService } from 'src/produits/services/produits/produits.service';

@Controller('produits')
export class ProduitsController {

    constructor (private produitsService: ProduitsService) {}

    @Get()
    async getProducts () {
        return await this.produitsService.getProduits();
    }

    @Get(':id')
    async getProduct (@Param('id', ParseIntPipe) id: number) {
        return await this.produitsService.getProduct(id);
    }

    @Get(':categorie_id')
    async getProductCategorie (@Param('categorie_id', ParseIntPipe) categorie_id: number) {
        
    }

    @Post()
    async createProduct (@Body() createProduitDto: CreateProduitDto) {
        return await this.produitsService.createProduct(createProduitDto);
    }

    @Put(':id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProduitDto: UpdateProduitDto) {
        return await this.produitsService.updateProduct(id, updateProduitDto);
    }

    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.produitsService.deleteProduct(id);
    }

}

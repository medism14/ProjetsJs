import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreatePanierDto } from 'src/paniers/dtos/CreatePanier.dto';
import { UpdatePanierDto } from 'src/paniers/dtos/UpdatePanier.dto';
import { PaniersService } from 'src/paniers/services/paniers/paniers.service';
import { ProduitsService } from 'src/produits/services/produits/produits.service';

@Controller('paniers')
export class PaniersController {
    constructor (private panierService: PaniersService) {}

    @Get()
    async getPaniers () {
        return await this.panierService.getPaniers();
    }

    @Get(':id')
    async getPanier (@Param('id', ParseIntPipe) id: number) {
        return await this.panierService.getPanier(id);
    }

    @Post()
    async createPanier (@Body() createPanierDto: CreatePanierDto) {
        return await this.panierService.createPanier(createPanierDto);
    }

    @Put(':id')
    async updatePanier (@Param('id', ParseIntPipe) id: number, @Body() updatePanierDto: UpdatePanierDto) {

        const panier = await this.panierService.updatePanier(id, updatePanierDto);
    }

    @Delete(':id')
    async deletePanier (@Param('id', ParseIntPipe) id:number) {
        return await this.panierService.deletePanier(id);
    }


}

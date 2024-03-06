import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreatePanierProduitDto } from 'src/panier_produits/dtos/CreatePanierProduit.dto';
import { UpdatePanierProduitDto } from 'src/panier_produits/dtos/UpdatePanierProduit.dto';
import { PanierProduitsService } from 'src/panier_produits/services/panier_produits/panier_produits.service';

@Controller('panier-produits')
export class PanierProduitsController {
    constructor (private panierProduitService: PanierProduitsService) {}

    @Get()
    async getPanierProduits () {
        return await this.panierProduitService.getPanierProduits();
    }

    @Get(':id')
    async getPanierProduit(@Param('id', ParseIntPipe) id: number) {
        return await this.panierProduitService.getPanierProduit(id);
    }

    @Post()
    async createPanierProduit (@Body() createPanierProduitDto: CreatePanierProduitDto) {
        return await this.panierProduitService.createPanierProduit(createPanierProduitDto);
    }

    @Put(':id')
    async updatePanierProduit (@Param('id', ParseIntPipe) id: number, @Body() updatePanierProduitDto: UpdatePanierProduitDto) {
        return await this.panierProduitService.updatePanierProduit(id, updatePanierProduitDto);
    }

    @Delete(':id')
    async deletePanierProduit (@Param('id', ParseIntPipe) id:number) {
        return await this.panierProduitService.deletePanierProduit(id);
    }
}

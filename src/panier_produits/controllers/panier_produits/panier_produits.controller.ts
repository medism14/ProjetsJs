import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Res } from '@nestjs/common';
import { CreatePanierProduitDto } from 'src/panier_produits/dtos/CreatePanierProduit.dto';
import { UpdatePanierProduitDto } from 'src/panier_produits/dtos/UpdatePanierProduit.dto';
import { PanierProduitsService } from 'src/panier_produits/services/panier_produits/panier_produits.service';
import { Response } from 'express';

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
    async createPanierProduit (@Body() createPanierProduitDto: CreatePanierProduitDto, @Res() res: Response) {
        try {
            let response = await this.panierProduitService.createPanierProduit(createPanierProduitDto);
            return res.status(200).json({message: response});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    @Put(':id')
    async updatePanierProduit (@Param('id', ParseIntPipe) id: number, @Body() updatePanierProduitDto: UpdatePanierProduitDto, @Res() res: Response) {
        try {  
            await this.panierProduitService.updatePanierProduit(id, updatePanierProduitDto);
            return res.status(200).json({message: 'cbon'});
        } catch (error) {
            return res.status(500).json({message: error.message});
        } 
    }

    @Delete(':id')
    async deletePanierProduit (@Param('id', ParseIntPipe) id:number, @Res() res: Response) {
        try {  
            await this.panierProduitService.deletePanierProduit(id);
            return res.status(200).json({message: 'cbon'});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

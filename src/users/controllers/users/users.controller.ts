import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { PaniersService } from 'src/paniers/services/paniers/paniers.service';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    
    constructor (private userService: UsersService, private panierService: PaniersService) {}

    @Get()
    async getUsers () {
        return await this.userService.findUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        // Créer l'utilisateur
        const user = await this.userService.createUser(createUserDto);

        // Créer un panier pour l'utilisateur
        const createPanierDto = {
            userId: user.id,
        };

        await this.panierService.createPanier(createPanierDto);

        // Retourner l'utilisateur créé
        return user;
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.getUser(id);
    }

    @Put(':id')
    async updatedUserById(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDto: UpdateUserDto
    ) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.deleteUser(id);
    }

}

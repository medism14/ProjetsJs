import { Controller, Post, Body, Get, Res, Param } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { PaniersService } from 'src/paniers/services/paniers/paniers.service';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users/users.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private panierService: PaniersService, private userService: UsersService){}

    @Post('login')
    async login (@Body() body: {email: string, password: string}, @Res({passthrough: true}) res: Response) {
        try {
            const { token, user } = await this.authService.login(body.email, body.password);

            res.status(200).json({accessToken: token, user});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    @Post('register')
    async register(@Body() body: {firstName: string, lastName: string, email: string, password: string}, @Res() res: Response) {
        try {
            var { token, user } = await this.authService.register(body);

            // Créer un panier pour l'utilisateur
            const createPanierDto = {
                userId: user.id,
            };

            await this.panierService.createPanier(createPanierDto);

            user = await this.userService.getUser(user.id);
            
            res.status(200).json({ accessToken: token, user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    @Get('verifyToken/:token')
    async verifyToken(@Param('token') token: string, @Res() res: Response) {
        try {
            jwt.verify(token, 'authMan');
            res.status(200).json({message: 'Le token est bien valide'})
        } catch (error) {
            res.status(400).json({message: 'Le token n\'est pas valide'})
        }
    }

}

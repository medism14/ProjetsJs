import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { PaniersService } from 'src/paniers/services/paniers/paniers.service';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panier } from 'src/typeorm/entities/Panier';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
        secret: 'authMan',
        signOptions: { expiresIn: '7d' }
    }),
    TypeOrmModule.forFeature([User, Panier])
  ],
  controllers: [AuthController],
  providers: [AuthService, PaniersService, UsersService]
})
export class AuthModule {}

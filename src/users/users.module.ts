import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { PaniersService } from '../paniers/services/paniers/paniers.service';
import { Panier } from 'src/typeorm/entities/Panier';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Panier]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PaniersService,
  ],
})
export class UsersModule {}

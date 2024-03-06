import { Module } from '@nestjs/common';
import { PaniersController } from './controllers/paniers/paniers.controller';
import { PaniersService } from './services/paniers/paniers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panier } from 'src/typeorm/entities/Panier';

@Module({
  imports: [TypeOrmModule.forFeature([Panier])],
  controllers: [PaniersController],
  providers: [PaniersService]
})
export class PaniersModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { PanierProduitsController } from './panier_produits.controller';

describe('PanierProduitsController', () => {
  let controller: PanierProduitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanierProduitsController],
    }).compile();

    controller = module.get<PanierProduitsController>(PanierProduitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

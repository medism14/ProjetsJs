import { Test, TestingModule } from '@nestjs/testing';
import { PanierProduitsService } from './panier_produits.service';

describe('PanierProduitsService', () => {
  let service: PanierProduitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PanierProduitsService],
    }).compile();

    service = module.get<PanierProduitsService>(PanierProduitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

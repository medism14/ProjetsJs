import { Test, TestingModule } from '@nestjs/testing';
import { PaniersController } from './paniers.controller';

describe('PaniersController', () => {
  let controller: PaniersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaniersController],
    }).compile();

    controller = module.get<PaniersController>(PaniersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

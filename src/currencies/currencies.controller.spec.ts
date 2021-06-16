import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesController } from './currencies.controller';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
    }).compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrency', () => {
    it('should be throw when service throws', async () => {
      expect(controller.getCurrency).rejects.toThrow();
    });
  });
});

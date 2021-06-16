import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesController } from './currencies.controller';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;
  let service: CurrenciesService;

  beforeEach(async () => {
    const mockCurrenciesService = {
      getCurrency: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [
        {
          provide: CurrenciesService,
          useFactory: () => mockCurrenciesService,
        },
      ],
    }).compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrency', () => {
    it('should be throw when service throws', async () => {
      jest
        .spyOn(service, 'getCurrency')
        .mockRejectedValue(new BadRequestException());

      expect(controller.getCurrency('INVALID')).rejects.toThrow(
        new BadRequestException(),
      );
    });

    it('should be called service with correct params', async () => {
      await controller.getCurrency('USD');

      expect(service.getCurrency).toBeCalledWith('USD');
    });

    it('should be returns success service data', async () => {
      const mockData = {
        currency: 'USD',
        value: 1,
      } as Currencies;

      jest.spyOn(service, 'getCurrency').mockResolvedValue(mockData);

      expect(await service.getCurrency('USD')).toEqual(mockData);
    });
  });
});

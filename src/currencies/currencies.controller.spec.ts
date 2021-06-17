import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesController } from './currencies.controller';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;
  let service: CurrenciesService;
  let mockData;

  beforeEach(async () => {
    const mockCurrenciesService = {
      getCurrency: jest.fn(),
      createCurrency: jest.fn(),
      deleteCurrency: jest.fn(),
      updateCurrency: jest.fn(),
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
    mockData = {
      currency: 'USD',
      value: 1,
    } as Currencies;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GetCurrency', () => {
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
      jest.spyOn(service, 'getCurrency').mockResolvedValue(mockData);

      expect(await controller.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('CreateCurrency', () => {
    it('should be throw when service throws', async () => {
      jest
        .spyOn(service, 'createCurrency')
        .mockRejectedValue(new BadRequestException());

      expect(controller.createCurrency(mockData)).rejects.toThrow(
        new BadRequestException(),
      );
    });

    it('should be called service with correct params', async () => {
      await controller.createCurrency(mockData);

      expect(service.createCurrency).toBeCalledWith(mockData);
    });

    it('should be returns success service data', async () => {
      jest.spyOn(service, 'createCurrency').mockResolvedValue(mockData);

      expect(await controller.createCurrency(mockData)).toEqual(mockData);
    });
  });

  describe('DeleteCurrency', () => {
    it('should be throw when service throws', async () => {
      jest
        .spyOn(service, 'deleteCurrency')
        .mockRejectedValue(new BadRequestException());

      expect(controller.deleteCurrency('INVALID')).rejects.toThrow(
        new BadRequestException(),
      );
    });

    it('should be called service with correct params', async () => {
      await controller.deleteCurrency('USD');

      expect(service.deleteCurrency).toBeCalledWith('USD');
    });
  });

  describe('UpdateCurrency', () => {
    it('should be throw when service throws', async () => {
      jest
        .spyOn(service, 'updateCurrency')
        .mockRejectedValue(new BadRequestException());

      expect(
        controller.updateCurrency(mockData.currency, mockData.value),
      ).rejects.toThrow(new BadRequestException());
    });

    it('should be called service with correct params', async () => {
      await controller.updateCurrency(mockData.currency, mockData.value);

      expect(service.updateCurrency).toBeCalledWith(mockData);
    });

    it('should be returns success service data', async () => {
      jest.spyOn(service, 'updateCurrency').mockResolvedValue(mockData);

      expect(
        await controller.updateCurrency(mockData.currency, mockData.value),
      ).toEqual(mockData);
    });
  });
});

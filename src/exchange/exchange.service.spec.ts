import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Currencies } from 'src/currencies/currencies.entity';
import { CurrenciesService } from '../currencies/currencies.service';
import { ExchangeService } from './exchange.service';
import { ExchangeInputType } from './types/exchange-input.type';

describe('ExchangeService', () => {
  const USD = 1;
  const BRL = 0.2;

  let service: ExchangeService;
  let currenciesService: CurrenciesService;
  let mockData;

  const mockGetCurrencyUSDtoUSD = () => {
    (currenciesService.getCurrency as jest.Mock).mockReturnValueOnce({
      value: USD,
    });
    (currenciesService.getCurrency as jest.Mock).mockReturnValueOnce({
      value: USD,
    });
  };

  const mockGetCurrencyUSDtoBRL = () => {
    (currenciesService.getCurrency as jest.Mock).mockReturnValueOnce({
      value: USD,
    });
    (currenciesService.getCurrency as jest.Mock).mockReturnValueOnce({
      value: BRL,
    });
  };

  const mockGetCurrencyBRLtoUSD = () => {
    jest
      .spyOn(currenciesService, 'getCurrency')
      .mockResolvedValueOnce({ currency: 'BRL', value: BRL } as Currencies);
    jest
      .spyOn(currenciesService, 'getCurrency')
      .mockResolvedValueOnce({ currency: 'USD', value: USD } as Currencies);
  };

  beforeEach(async () => {
    const mockCurrenciesService = {
      getCurrency: jest.fn().mockReturnValue({ value: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        {
          provide: CurrenciesService,
          useFactory: () => mockCurrenciesService,
        },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currenciesService = module.get<CurrenciesService>(CurrenciesService);
    mockData = { from: 'USD', to: 'BRL', amount: 10 } as ExchangeInputType;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('ConvertAmount', () => {
    it('should be throw if called with invalid params', async () => {
      mockData.from = '';
      await expect(service.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );

      mockData.from = 'USD';
      mockData.amount = 0;
      await expect(service.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );

      mockData.from = 'USD';
      mockData.to = '';
      mockData.amount = 10;
      await expect(service.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );
    });

    it('should be not throw if called with valid params', async () => {
      await expect(service.convertAmount(mockData)).resolves.not.toThrow();
    });

    it('should be called getCurrency twice', async () => {
      await service.convertAmount(mockData);

      expect(currenciesService.getCurrency).toBeCalledTimes(2);
    });

    it('should be called getCurrency with correct params', async () => {
      await service.convertAmount(mockData);

      expect(currenciesService.getCurrency).toBeCalledWith('USD');
      expect(currenciesService.getCurrency).toHaveBeenLastCalledWith('BRL');
    });

    it('should be throw when getCurrency throw', async () => {
      (currenciesService.getCurrency as jest.Mock).mockRejectedValue(
        new Error(),
      );

      mockData.from = 'INVALID';

      await expect(service.convertAmount(mockData)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });

    it('should be return correct conversion value', async () => {
      mockGetCurrencyUSDtoUSD();
      mockData.from = 'USD';
      mockData.to = 'USD';
      expect(await service.convertAmount(mockData)).toEqual({ amount: 10 });

      mockGetCurrencyUSDtoBRL();
      mockData.from = 'USD';
      mockData.to = 'BRL';
      expect(await service.convertAmount(mockData)).toEqual({ amount: 50 });

      mockGetCurrencyBRLtoUSD();
      mockData.from = 'BRL';
      mockData.to = 'USD';
      expect(await service.convertAmount(mockData)).toEqual({ amount: 2 });
    });
  });
});

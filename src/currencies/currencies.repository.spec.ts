import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';

describe('CurrenciesRepository', () => {
  let repository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();

    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
    repository.save = jest.fn();
    mockData = { currency: 'USD', value: 1 } as Currencies;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('GetCurrency', () => {
    it('should be called findOne with correct params', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue({});

      await repository.getCurrency('USD');

      expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
    });

    it('should be throw findOne returns empty', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(undefined);

      await expect(repository.getCurrency('USD')).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should be returns success result when findOne returns', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(mockData);

      expect(await repository.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('CreateCurrency', () => {
    it('should be called save with correct params', async () => {
      jest.spyOn(repository, 'save').mockReturnValue(mockData);

      await repository.createCurrency(mockData);

      expect(repository.save).toBeCalledWith(mockData);
    });

    it('should be throw if called save with incorrect params', async () => {
      mockData.currency = 'INVALID';
      await expect(repository.createCurrency(mockData)).rejects.toThrow();

      mockData.currency = 'USD';
      mockData.value = 'INVALID';
      await expect(repository.createCurrency(mockData)).rejects.toThrow();
    });

    it('should be throw when save throws', async () => {
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());

      await expect(repository.createCurrency(mockData)).rejects.toThrow();
    });

    it('should be returns success result when save created data', async () => {
      expect(await repository.createCurrency(mockData)).toEqual(mockData);
    });
  });

  describe('UpdateCurrency', () => {
    it('should be called findOne with correct params', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue({});

      await repository.updateCurrency(mockData);

      expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
    });

    it('should be throw if findOne returns empty', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(undefined);

      await expect(repository.updateCurrency(mockData)).rejects.toThrow(
        new NotFoundException(`The currency ${mockData.currency} not found!`),
      );
    });

    it('should be called save with correct params', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(mockData);
      jest.spyOn(repository, 'save').mockReturnValue(mockData);

      await repository.updateCurrency(mockData);

      expect(repository.save).toBeCalledWith(mockData);
    });

    it('should be throw when save throws', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(mockData);
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(repository.updateCurrency(mockData)).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should be returns success updated data', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockReturnValue({ currency: 'USD', value: 1 });
      jest.spyOn(repository, 'save').mockReturnValue({});

      const result = await repository.updateCurrency({
        currency: 'USD',
        value: 2,
      });

      expect(result).toEqual({ currency: 'USD', value: 2 });
    });
  });

  describe('DeleteCurrency', () => {
    it('should be called findOne with correct params', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue({});

      await repository.deleteCurrency('USD');

      expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
    });

    it('should be throw if findOne returns empty', async () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(undefined);

      await expect(repository.deleteCurrency('INVALID')).rejects.toThrow(
        new NotFoundException(`The currency INVALID not found!`),
      );
    });
  });
});

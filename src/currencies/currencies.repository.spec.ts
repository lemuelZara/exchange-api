import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository } from './currencies.repository';

describe('CurrenciesRepository', () => {
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();

    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
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
  });
});

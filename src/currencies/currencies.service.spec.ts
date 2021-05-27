import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository, CurrenciesService } from './currencies.service';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let repository: CurrenciesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: CurrenciesRepository,
          useFactory: () => ({
            getCurrency: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GetCurrency', () => {
    it('should be throw if repository throw', async () => {
      jest
        .spyOn(repository, 'getCurrency')
        .mockRejectedValueOnce(new InternalServerErrorException());

      await expect(service.getCurrency('INVALID')).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.getCurrency('USD')).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await service.getCurrency('USD');

      expect(repository.getCurrency).toHaveBeenCalledWith('USD');
    });
  });
});

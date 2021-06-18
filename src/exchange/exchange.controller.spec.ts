import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeInputDTO } from './dto/exchange-input.dto';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

describe('ExchangeController', () => {
  let controller: ExchangeController;
  let service: ExchangeService;
  let mockData;

  beforeEach(async () => {
    const mockExchangeService = {
      convertAmount: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeController],
      providers: [
        { provide: ExchangeService, useFactory: () => mockExchangeService },
      ],
    }).compile();

    controller = module.get<ExchangeController>(ExchangeController);
    service = module.get<ExchangeService>(ExchangeService);
    mockData = { from: 'USD', to: 'BRL', amount: 10 } as ExchangeInputDTO;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('convertAmount', () => {
    it('should be throw when service throw', async () => {
      jest
        .spyOn(service, 'convertAmount')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.convertAmount(mockData)).rejects.toThrow(
        new BadRequestException(),
      );
    });

    it('should be called service with correct params', async () => {
      await controller.convertAmount(mockData);

      expect(service.convertAmount).toBeCalledWith(mockData);
    });
  });
});

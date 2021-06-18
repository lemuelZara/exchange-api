import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeInputType } from './types/exchange-input.type';

@Controller('exchange')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @Get('/')
  async convertAmount(data: ExchangeInputType) {
    return this.exchangeService.convertAmount(data);
  }
}

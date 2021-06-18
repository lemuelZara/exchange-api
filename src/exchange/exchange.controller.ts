import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ExchangeInputType } from './types/exchange-input.type';

@Controller('exchange')
export class ExchangeController {
  @Get('/')
  async convertAmount(data: ExchangeInputType) {
    throw new BadRequestException();
  }
}

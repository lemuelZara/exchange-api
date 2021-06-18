import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ExchangeInputDTO } from './dto/exchange-input.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @Get('/')
  async convertAmount(data: ExchangeInputDTO) {
    return this.exchangeService.convertAmount(data);
  }
}

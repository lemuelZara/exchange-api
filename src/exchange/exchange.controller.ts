import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExchangeInputDTO } from './dto/exchange-input.dto';
import { ExchangeService } from './exchange.service';
import { ExchangeType } from './types/exchange.type';

@Controller('exchange')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @Get('/')
  @UsePipes(ValidationPipe)
  async convertAmount(@Query() data: ExchangeInputDTO): Promise<ExchangeType> {
    return await this.exchangeService.convertAmount(data);
  }
}

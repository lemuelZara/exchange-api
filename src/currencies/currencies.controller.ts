import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDTO } from './dto/create-currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @Get('/:currency')
  async getCurrency(@Param('currency') currency: string): Promise<Currencies> {
    return await this.currenciesService.getCurrency(currency);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async createCurrency(
    @Body() currency: CreateCurrencyDTO,
  ): Promise<Currencies> {
    return await this.currenciesService.createCurrency(currency);
  }

  @Delete('/:currency')
  async deleteCurrency(@Param('currency') currency: string): Promise<void> {
    throw new BadRequestException();
  }
}

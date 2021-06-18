import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CurrenciesService } from '../currencies/currencies.service';
import { ExchangeInputDTO } from './dto/exchange-input.dto';
import { ExchangeType } from './types/exchange.type';

@Injectable()
export class ExchangeService {
  constructor(private currenciesService: CurrenciesService) {}

  async convertAmount({
    from,
    to,
    amount,
  }: ExchangeInputDTO): Promise<ExchangeType> {
    if (!from || !to || !amount) {
      throw new BadRequestException();
    }

    try {
      const currencyFrom = await this.currenciesService.getCurrency(from);
      const currencyTo = await this.currenciesService.getCurrency(to);

      const result = (currencyFrom.value / currencyTo.value) * amount;

      return { amount: result };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

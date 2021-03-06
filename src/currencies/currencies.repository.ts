import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { CreateCurrencyDTO } from './dto/create-currency.dto';

@EntityRepository(Currencies)
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOne({ currency });

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found!`);
    }

    return result;
  }

  async createCurrency(currencyData: CreateCurrencyDTO): Promise<Currencies> {
    const currency = new Currencies();

    Object.assign(currency, currencyData);

    try {
      await validateOrReject(currency);

      await this.save(currency);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return currency;
  }

  async updateCurrency({
    currency,
    value,
  }: CreateCurrencyDTO): Promise<Currencies> {
    const result = await this.findOne({ currency });

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found!`);
    }

    result.value = value;

    try {
      await this.save(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return result;
  }

  async deleteCurrency(currency: string): Promise<void> {
    const result = await this.findOne({ currency });

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found!`);
    }

    await this.delete(result);
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CurrenciesService {
  async getCurrency(currency: string): Promise<any> {
    throw new InternalServerErrorException();
  }
}

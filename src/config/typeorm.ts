import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Currencies } from 'src/currencies/currencies.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://dbExchange:Fc8onLlRogPE5RCd@cluster-exchange-api.g1dl5.mongodb.net/exchange?retryWrites=true&w=majority',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [Currencies],
  synchronize: true,
  autoLoadEntities: true,
};

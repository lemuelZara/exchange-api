import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class ExchangeInputDTO {
  @IsNotEmpty()
  @Length(3, 3)
  from: string;

  @IsNotEmpty()
  @Length(3, 3)
  to: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

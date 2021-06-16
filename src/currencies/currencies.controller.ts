import { Controller, Get } from '@nestjs/common';

@Controller('currencies')
export class CurrenciesController {
	@Get()
	async getCurrency() {
		throw new Error();
	}
}

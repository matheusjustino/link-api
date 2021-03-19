import {
	Controller,
	Get,
	Post,
	Body,
	HttpStatus,
	Res,
	Param,
} from '@nestjs/common';

// Services
import { BlingService } from './bling.service';

@Controller('bling')
export class BlingController {
	constructor(private readonly blingService: BlingService) {}

	@Post('save-order')
	public saveOrder(@Res() res, @Body() body) {
		return this.blingService.saveOrder().subscribe(
			(result) => {
				// console.log('controller: ', result);
				return res.status(HttpStatus.OK).json(result);
			},
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}
}

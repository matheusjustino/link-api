import { Controller, Get, Post, HttpStatus, Res } from '@nestjs/common';

// Services
import { BlingService } from './bling.service';

@Controller('bling')
export class BlingController {
	constructor(private readonly blingService: BlingService) {}

	@Post('save-order')
	public saveOrder(@Res() res) {
		return this.blingService.integration().subscribe(
			(result) => {
				return res.status(HttpStatus.OK).json(result);
			},
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Post('save-on-database')
	public saveOnDatabase(@Res() res) {
		return this.blingService.saveOnDatabase().subscribe(
			(result) => {
				console.log(result);
				return res.status(HttpStatus.OK).json(result);
			},
			(error) => {
				console.log(error);
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Get('reports')
	public getFromDatabase(@Res() res) {
		return this.blingService.reports().subscribe(
			(result) => {
				console.log(result);
				return res.status(HttpStatus.OK).json(result);
			},
			(error) => {
				console.log(error);
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}
}

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
import { PipedriveService } from './pipedrive.service';

// Schemas
import { Deal } from './../database/schemas/deal.schema';

@Controller('pipedrive')
export class PipedriveController {
	constructor(private readonly pipedriveService: PipedriveService) {}

	@Post('deals')
	public addDeal(@Res() res, @Body() body: Deal) {
		return this.pipedriveService.addDeal(body).subscribe(
			(result) => res.status(HttpStatus.OK).json(result.data),
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Get('deals')
	public getAllDeals(@Res() res) {
		return this.pipedriveService.getAllDeals().subscribe(
			(result) => res.status(HttpStatus.OK).json(result.data),
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Get('deals/:dealId')
	public getDealDetails(@Res() res, @Param('dealId') dealId: string) {
		return this.pipedriveService.getDealDetails(dealId).subscribe(
			(result) => res.status(HttpStatus.OK).json(result.data),
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}
}

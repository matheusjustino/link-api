import {
	Controller,
	Get,
	Post,
	Body,
	HttpStatus,
	Res,
	Param,
	Query,
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
			(result) => res.status(HttpStatus.OK).json(result),
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Get('deals')
	public getAllDeals(@Res() res, @Query() query) {
		return this.pipedriveService.getAllDeals(query).subscribe(
			(result) => {
				res.status(HttpStatus.OK).json(result);
				return result;
			},
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Get('deals/:dealId')
	public getDealDetails(@Res() res, @Param('dealId') dealId: string) {
		return this.pipedriveService.getDealDetails(dealId).subscribe(
			(result) => res.status(HttpStatus.OK).json(result),
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}
}

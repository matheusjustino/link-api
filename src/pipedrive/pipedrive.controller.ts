import {
	Controller,
	Get,
	Post,
	Delete,
	Body,
	HttpStatus,
	Res,
	Logger,
	Param,
	Put,
	HttpService,
} from '@nestjs/common';

// Services
import { PipedriveService } from './pipedrive.service';

// Schemas
import { Deal } from './../database/schemas/deal.schema';
import { AppConfigService } from '../config/app-config.service';

@Controller('pipedrive')
export class PipedriveController {
	private pipedriveUrl: string;
	private query: string;

	constructor(
		private readonly pipedriveService: PipedriveService,
		private readonly httpService: HttpService,
		private readonly configService: AppConfigService,
	) {
		this.pipedriveUrl = `https://${this.configService.companyDomain}.pipedrive.com/api/v1/deals`;
		this.query = `?api_token=${this.configService.pipedriveTokenAPI}`;
	}

	@Post('deals')
	public addDeal(@Res() res, @Body() body: Deal) {
		return this.httpService
			.post(this.pipedriveUrl + this.query, body)
			.subscribe(
				(result) => res.status(HttpStatus.OK).json(result.data),
				(error) => {
					res.status(HttpStatus.BAD_REQUEST).json(error);
					throw new Error(error);
				},
			);
	}

	@Get('deals')
	public getAllDeals(@Res() res) {
		return this.httpService.get(this.pipedriveUrl + this.query).subscribe(
			(result) => res.status(HttpStatus.OK).json(result.data),
			(error) => {
				res.status(HttpStatus.BAD_REQUEST).json(error);
				throw new Error(error);
			},
		);
	}

	@Get('deals/:dealId')
	public getDealDetails(@Res() res, @Param('dealId') dealId: string) {
		return this.httpService
			.get(this.pipedriveUrl + `/${dealId}` + this.query)
			.subscribe(
				(result) => res.status(HttpStatus.OK).json(result.data),
				(error) => {
					res.status(HttpStatus.BAD_REQUEST).json(error);
					throw new Error(error);
				},
			);
	}
}

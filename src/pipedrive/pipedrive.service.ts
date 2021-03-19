import { HttpService, Injectable } from '@nestjs/common';
import { AppConfigService } from './../config/app-config.service';
import { DealRepository } from '../database/repositories/deal.repository';
import { Deal } from '../database/schemas/deal.schema';

@Injectable()
export class PipedriveService {
	private pipedriveUrl: string;
	private query: string;

	constructor(
		private readonly dealRepository: DealRepository,
		private readonly configService: AppConfigService,
		private readonly httpService: HttpService,
	) {
		this.pipedriveUrl = `https://${this.configService.companyDomain}.pipedrive.com/api/v1/deals`;
		this.query = `?api_token=${this.configService.pipedriveTokenAPI}`;
	}

	public addDeal(data: Deal) {
		return this.httpService.post(this.pipedriveUrl + this.query, data);
	}

	public getAllDeals() {
		return this.httpService.get(this.pipedriveUrl + this.query);
	}

	public getDealDetails(dealId: string) {
		return this.httpService.get(
			this.pipedriveUrl + `/${dealId}` + this.query,
		);
	}
}

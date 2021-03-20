import { HttpService, Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Repositories
import { DealRepository } from '../database/repositories/deal.repository';

// Interfaces
import { IPipedriveResponse } from '../interfaces/pipedrive-response.interface';

// Schemas
import { Deal } from '../database/schemas/deal.schema';

// Services
import { AppConfigService } from './../config/app-config.service';

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

	public addDeal(data: Deal): Observable<IPipedriveResponse> {
		return this.httpService
			.post(this.pipedriveUrl + this.query, data)
			.pipe(map((data) => data.data.data));
	}

	public getAllDeals(query?): Observable<IPipedriveResponse[]> {
		if (query) {
			query = this.query + this.getQuery(query);
		}

		return this.httpService.get(this.pipedriveUrl + query).pipe(
			map((data) => {
				if (!data.data.data) return 'No deals';
				return data.data.data;
			}),
		);
	}

	public getDealDetails(dealId: string): Observable<IPipedriveResponse> {
		return this.httpService
			.get(this.pipedriveUrl + `/${dealId}` + this.query)
			.pipe(map((data) => data.data.data));
	}

	private getQuery(query): string {
		const keys = Object.keys(query);

		let formattedQuery = '';

		for (let i = 0; i < keys.length; i++) {
			const value = query[keys[i]];
			formattedQuery += `&${keys[i]}=${value}`;
		}

		return formattedQuery;
	}
}

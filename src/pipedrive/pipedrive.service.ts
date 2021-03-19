import { Injectable } from '@nestjs/common';
import { DealRepository } from '../database/repositories/deal.repository';
import { Deal } from '../database/schemas/deal.schema';
import { AppConfigService } from './../config/app-config.service';

@Injectable()
export class PipedriveService {
	private pipedriveUrl: string;

	constructor(
		private readonly dealRepository: DealRepository,
		private readonly configService: AppConfigService,
	) {
		// this.pipedriveUrl = `https://${this.configService.companyDomain}`
	}

	public async addDeal(data: Deal): Promise<any> {
		try {
			return await this.dealRepository.dealModel.create(data);
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}

	public async getAllDeals(): Promise<any> {
		try {
			return await this.dealRepository.dealModel.find();
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}
}

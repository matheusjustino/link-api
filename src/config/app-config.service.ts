import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get companyDomain(): string {
		return this.configService.get<string>('COMPANY_DOMAIN');
	}

	public get pipedriveTokenAPI(): string {
		return this.configService.get<string>('PIPEDRIVE_TOKEN_API');
	}

	public get blingTokenApi(): string {
		return this.configService.get<string>('BLING_TOKEN_API');
	}

	public get blingXmlUrl(): string {
		return this.configService.get<string>('BLING_XML_URL');
	}

	public get databaseUrl(): string {
		return this.configService.get<string>('DATABASE_URL');
	}
}

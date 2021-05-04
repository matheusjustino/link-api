import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { AppConfigModule } from '../config/config.module';

// Providers
import { modelsProviderAsync } from './models.provider';

// Services
import { AppConfigService } from './../config/app-config.service';

// Repositories
import { DealRepository } from './repositories/deal.repository';
import { OrderRepository } from './repositories/order.repository';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				uri: appConfigService.databaseUrl,
				useNewUrlParser: true,
				useFindAndModify: true,
				useUnifiedTopology: true,
			}),
			inject: [AppConfigService],
		}),
		MongooseModule.forFeatureAsync(modelsProviderAsync),
	],
	providers: [DealRepository, OrderRepository],
	exports: [DealRepository, OrderRepository],
})
export class DatabaseModule {}

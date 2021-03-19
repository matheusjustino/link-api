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

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: () => ({
				uri: 'mongodb://localhost:27017/linkapi',
				useNewUrlParser: true,
				useFindAndModify: true,
				useUnifiedTopology: true,
			}),
			inject: [AppConfigService],
		}),
		MongooseModule.forFeatureAsync(modelsProviderAsync),
	],
	providers: [DealRepository],
	exports: [DealRepository],
})
export class DatabaseModule {}

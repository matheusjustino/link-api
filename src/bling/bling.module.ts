import { HttpModule, Module } from '@nestjs/common';

// Modules
import { PipedriveModule } from '../pipedrive/pipedrive.module';
import { DatabaseModule } from './../database/database.module';
import { AppConfigModule } from '../config/config.module';

// Controllers
import { BlingController } from './bling.controller';

// Services
import { BlingService } from './bling.service';

@Module({
	imports: [DatabaseModule, PipedriveModule, HttpModule, AppConfigModule],
	providers: [BlingService],
	controllers: [BlingController],
})
export class BlingModule {}

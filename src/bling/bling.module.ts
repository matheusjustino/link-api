import { HttpModule, Module } from '@nestjs/common';

// Modules
import { PipedriveModule } from '../pipedrive/pipedrive.module';
import { DatabaseModule } from './../database/database.module';
import { AppConfigModule } from '../config/config.module';
import { XmlModule } from './../xml/xml.module';
import { ScheduleModule } from './../schedule/schedule.module';

// Controllers
import { BlingController } from './bling.controller';

// Services
import { BlingService } from './bling.service';
import { blingProvider } from './bling.provider';

@Module({
	imports: [
		DatabaseModule,
		PipedriveModule,
		HttpModule,
		AppConfigModule,
		XmlModule,
		ScheduleModule,
	],
	providers: [BlingService, ...blingProvider],
	controllers: [BlingController],
})
export class BlingModule {}

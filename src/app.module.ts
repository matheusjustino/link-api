import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PipedriveModule } from './pipedrive/pipedrive.module';
import { BlingModule } from './bling/bling.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { XmlModule } from './xml/xml.module';
import { ScheduleModule } from './schedule/schedule.module';
import { blingProvider } from './bling/bling.provider';

@Module({
	imports: [
		PipedriveModule,
		DatabaseModule,
		AppConfigModule,
		XmlModule,
		ScheduleModule,
		BlingModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }

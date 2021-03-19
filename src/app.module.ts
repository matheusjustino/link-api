import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PipedriveModule } from './pipedrive/pipedrive.module';
import { BlingModule } from './bling/bling.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';

@Module({
	imports: [PipedriveModule, BlingModule, DatabaseModule, AppConfigModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

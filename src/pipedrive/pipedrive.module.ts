import { HttpModule, Module } from '@nestjs/common';

// Modules
import { DatabaseModule } from './../database/database.module';
import { AppConfigModule } from './../config/config.module';
import { PipedriveController } from './pipedrive.controller';

// Services
import { PipedriveService } from './pipedrive.service';

@Module({
	imports: [AppConfigModule, DatabaseModule, HttpModule],
	providers: [PipedriveService],
	controllers: [PipedriveController],
})
export class PipedriveModule {}

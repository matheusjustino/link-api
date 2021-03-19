import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PipedriveModule } from './pipedrive/pipedrive.module';
import { BlingModule } from './bling/bling.module';

@Module({
	imports: [PipedriveModule, BlingModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

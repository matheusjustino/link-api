import { Module } from '@nestjs/common';
import { PipedriveController } from './pipedrive.controller';

@Module({
	controllers: [PipedriveController],
})
export class PipedriveModule {}

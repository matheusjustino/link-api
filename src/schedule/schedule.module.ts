import { Module } from '@nestjs/common';
import { ScheduleService } from './service/schedule.service';

@Module({
	providers: [ScheduleService],
	exports: [ScheduleService],
})
export class ScheduleModule {}

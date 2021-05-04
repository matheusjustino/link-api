import { Job } from 'node-schedule';

export interface JobInterface {
	readonly id: string;
	readonly job: Job;
}

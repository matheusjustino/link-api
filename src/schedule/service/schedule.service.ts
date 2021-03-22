import * as moment from 'moment';
import '../../common/array-list';
import { Injectable } from '@nestjs/common';
import { Observable, fromEvent, of } from 'rxjs';
import * as scheduler from 'node-schedule';
import { EventEmitter } from 'events';
import { JobInterface } from '../interfaces/job.interface';

@Injectable()
export class ScheduleService {
	private readonly jobs: Array<JobInterface>;

	constructor() {
		this.jobs = new Array<JobInterface>();
	}

	public scheduleJob(id: string, cronTime: string): Observable<void> {
		const event = new EventEmitter();
		const job: JobInterface = {
			id,
			job: scheduler.scheduleJob(cronTime, () => {
				event.emit('scheduleJob');
			}),
		};

		this.jobs.addUnique(job, (element) => element.id === id);

		return fromEvent(event, 'scheduleJob');
	}

	public scheduleOneTime(cronTime: string): Observable<void> {
		const event = new EventEmitter();
		scheduler.scheduleJob(cronTime, () => {
			event.emit('scheduleOneTimeJob');
		});

		return fromEvent(event, 'scheduleOneTimeJob');
	}

	public turnOffJob(id: string): Observable<void> {
		const job = this.jobs.find((e) => e.id === id);

		if (!job) throw new Error("Job doesn't exists.");

		job.job.cancel();

		return of(this.jobs.remove((e) => e.id === job.id));
	}

	public secondsToCronTime(seconds: number): string {
		const time = moment();

		time.add(seconds, 's');

		return `${time.second()} ${time.minute()} ${time.hour()} ${time.date()} ${
			time.month() + 1
		} * ${time.year()}`;
	}

	public getScheduleIds(): Observable<string[]> {
		const ids: string[] = this.jobs.map((job) => job.id);
		return of(ids);
	}
}

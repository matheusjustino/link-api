import { of } from 'rxjs';
import {
	map,
	mergeMap,
	filter,
	tap,
	concatMap,
	switchMap,
} from 'rxjs/operators';

// Services
import { ScheduleService } from '../schedule/service/schedule.service';
import { BlingService } from './bling.service';

export const blingProvider = [
	{
		provide: 'UpdateBlingWithDeals',
		useFactory: (
			scheduleService: ScheduleService,
			blingService: BlingService,
		) => {
			scheduleService
				.scheduleOneTime('*/1 * * * *')
				.pipe(
					tap(() => console.log('Iniciando update...')),
					switchMap(() =>
						blingService
							.integration()
							.pipe(map((result) => result)),
					),
				)
				.subscribe(
					(result) => {
						console.log(result);
						console.log('Update finalizado');
					},
					(error) => console.log('Ops... ', error),
				);
		},
		inject: [ScheduleService, BlingService],
	},
	{
		provide: 'SaveTotalDay',
		useFactory: (
			scheduleService: ScheduleService,
			blingService: BlingService,
		) => {
			scheduleService
				.scheduleOneTime('*/2 * * * *')
				.pipe(
					tap(() => console.log('Inserindo/atualizando dados...')),
					switchMap(() =>
						blingService
							.saveOnDatabase()
							.pipe(map((result) => result)),
					),
				)
				.subscribe(
					(result) => {
						console.log(result);
						console.log('Finalizado');
					},
					(error) => console.log('Ops... ', error),
				);
		},
		inject: [ScheduleService, BlingService],
	},
	{
		provide: 'GetBlingReports',
		useFactory: (
			scheduleService: ScheduleService,
			blingService: BlingService,
		) => {
			scheduleService
				.scheduleOneTime('*/3 * * * *')
				.pipe(
					tap(() => console.log('Iniciando Busca...')),
					switchMap(() =>
						blingService.reports().pipe(map((result) => result)),
					),
				)
				.subscribe(
					(result) => {
						console.log(result);
						console.log('Busca finalizada');
					},
					(error) => console.log('Ops... ', error),
				);
		},
		inject: [ScheduleService, BlingService],
	},
];

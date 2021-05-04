import { of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

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
				.scheduleOneTime(scheduleService.buildCronTime('*/29'))
				.pipe(
					tap(() =>
						console.log(
							'Sincronizando dados pipedrive -> bling...',
						),
					),
					switchMap(() =>
						blingService
							.integration()
							.pipe(map((result) => result)),
					),
				)
				.subscribe(
					(result) => {
						console.log(result);
						console.log('Sincrinização finalizada');
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
				.scheduleOneTime(scheduleService.buildCronTime('59', '23'))
				.pipe(
					tap(() =>
						console.log(
							'Inserindo/atualizando dados bling -> mongodb atlas...',
						),
					),
					switchMap(() =>
						blingService
							.saveOnDatabase()
							.pipe(map((result) => result)),
					),
				)
				.subscribe(
					(result) => {
						console.log(result);
						console.log('Inserção/Atualização Finalizada');
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
				.scheduleOneTime(scheduleService.buildCronTime('*/30'))
				.pipe(
					tap(() =>
						console.log(
							'Buscando dados do dia -> mongodb atlas...',
						),
					),
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

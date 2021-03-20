import { HttpService, Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import {
	bufferCount,
	catchError,
	concatAll,
	concatMap,
	map,
	mergeMap,
	reduce,
	switchMap,
	take,
	tap,
} from 'rxjs/operators';

// Services
import { AppConfigService } from './../config/app-config.service';
import { PipedriveService } from './../pipedrive/pipedrive.service';
import { XmlService } from '../xml/xml.service';

// Repositories
import { OrderRepository } from './../database/repositories/order.repository';

// Interfaces
import { IPipedriveResponse } from '../interfaces/pipedrive-response.interface';
import { IBlingOrderSuccess } from '../interfaces/bling-order-success.interface';
import { IBlingOrderError } from '../interfaces/bling-order.error.interface';
import { IBlingDailyReport } from '../interfaces/bling-daily-report.interface';
import { IReports } from 'src/interfaces/reports.interface';

@Injectable()
export class BlingService {
	private blingUrl: string;

	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly pipedriveService: PipedriveService,
		private readonly appConfigService: AppConfigService,
		private readonly httpService: HttpService,
		private readonly xmlService: XmlService,
	) {
		this.blingUrl = this.appConfigService.blingXmlUrl;
	}

	public integration() {
		return this.pipedriveService.getAllDeals({ status: 'won' }).pipe(
			concatAll(), // Emitir os valores Deals um por um.
			mergeMap((deals: IPipedriveResponse) => {
				const dealXml = this.xmlService.convertObjToXml(deals); // Convertendo o Deal para o XML (exemplo) do Bling
				return from(dealXml).pipe(
					// Mapeando o resultado para um Observable<{ XML, Valor do Deal }>
					map((result) => ({ result, value: deals.value })),
				);
			}),
			mergeMap(({ result, value }) => {
				const order = this.httpService.post(
					this.blingUrl +
						`&apikey=${this.appConfigService.blingTokenApi}`,
					{},
					{
						params: {
							xml: result,
						},
					},
				);
				return from(order).pipe(
					map((blingResult) => ({ blingResult, value })),
				);
			}),
			mergeMap(({ blingResult, value }) => {
				if (blingResult.data.retorno.erros) {
					const error: IBlingOrderError =
						blingResult.data.retorno.erros[0].erro;
					return of(error);
				}

				const data: IBlingOrderSuccess =
					blingResult.data.retorno.pedidos[0].pedido;
				data.value = value;

				return of(data);
			}),
			reduce((acc: IBlingOrderSuccess[], next) => [...acc, next], []),
			catchError((error) => error),
		);
	}

	public saveOnDatabase() {
		return this.httpService
			.get(
				'https://bling.com.br/Api/v2/pedidos/json/' +
					`?apikey=${this.appConfigService.blingTokenApi}`,
			)
			.pipe(
				map((result) => {
					if (result.data.retorno.erros) {
						return of(result.data.retorno.erros[0].erro);
					}

					const today = this.formatTodayDate();

					const dataToSave = {
						date: today,
						totalAmount: 0,
						count: 0,
					};

					result.data.retorno.pedidos.map(({ pedido }) => {
						if (pedido.data === today) {
							dataToSave['totalAmount'] += Number(
								pedido.totalvenda,
							);
							dataToSave['count'] += 1;
						}
					});

					const options = {
						upsert: true,
						new: true,
						setDefaultsOnInsert: true,
					};

					const insertUpdate = this.orderRepository.orderModel // Salvando a resposta do blig no mongodb atlas
						.findOneAndUpdate(
							{ date: dataToSave.date },
							dataToSave,
							options,
						)
						.exec();

					return from(insertUpdate).pipe(map((result) => result));
				}),
				switchMap((result) => result),
			);
	}

	public reports(): Observable<IReports[]> {
		return from(this.orderRepository.orderModel.find()).pipe(
			map((result) => {
				const data: IReports[] = result.map((pedido) => {
					return {
						id: pedido.date,
						totalAmount: pedido.totalAmount,
						count: pedido.count,
					};
				});

				return data;
			}),
		);
	}

	private formatTodayDate(): string {
		const date = new Date();
		const today = `${date.getFullYear()}-${
			date.getMonth() + 1 > 9
				? date.getMonth() + 1
				: `0${date.getMonth() + 1}`
		}-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`;

		return today;
	}
}

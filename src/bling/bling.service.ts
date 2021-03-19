import { HttpService, Injectable } from '@nestjs/common';
import { concatMap, map, switchMap, take } from 'rxjs/operators';
const jsonToXml = require('js2xmlparser').parse;

// Interfaces
import { IBlingOrder } from './../database/interfaces/bling-order';

// Services
import { AppConfigService } from './../config/app-config.service';
import { PipedriveService } from './../pipedrive/pipedrive.service';

// Models
import { BlingOrderModel } from '../models/bling.model';
import { of } from 'rxjs';

@Injectable()
export class BlingService {
	private blingUrl: string;

	constructor(
		private readonly pipedriveService: PipedriveService,
		private readonly appConfigService: AppConfigService,
		private readonly httpService: HttpService,
	) {
		this.blingUrl = 'https://bling.com.br/Api/v2/pedido/json/';
	}

	public saveOrder() {
		return this.pipedriveService.getAllDeals().pipe(
			concatMap(({ data }) => {
				console.log(data.data);
				if (data.data) {
					const dealXml = this.convertObjToXml(data.data[0]);

					return dealXml;
				}
				return of(['No orders']);
			}),
			switchMap((result) => {
				console.log(result);
				return this.httpService.post(
					this.blingUrl,
					{},
					{
						params: {
							apiKey: this.appConfigService.blingTokenApi,
							xml: result,
						},
					},
				);
			}),
		);
	}

	private async convertObjToXml(pipedriveObj) {
		const orderObj = {
			pedido: [
				{
					cliente: {
						nome: pipedriveObj.creator_user_id.name,
						email: pipedriveObj.creator_user_id.email,
					},
					transporte: {
						transportadora: 'Transportadora XYZ',
						tipo_frete: 'R',
						servico_correios: 'SEDEX - CONTRATO',
					},
					volumes: {
						volume: {
							servico: 'SEDEX - CONTRATO',
							codigoRastreamento: 'RX32084021',
						},
					},
					items: {
						item: {
							codigo: 1,
							descricao: 'Item',
							vlr_unit: pipedriveObj.value,
						},
					},
				},
			],
		};

		return jsonToXml('pedido', orderObj);
	}
}

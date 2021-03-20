import { Injectable } from '@nestjs/common';
const jsonToXml = require('js2xmlparser').parse;

// Interfaces
import { IPipedriveResponse } from '../interfaces/pipedrive-response.interface';
import { IBlingOrderXml } from '../interfaces/bling-order-xml.interface';

@Injectable()
export class XmlService {
	public async convertObjToXml(
		pipedriveObj: IPipedriveResponse,
	): Promise<IBlingOrderXml> {
		const orderObjExample: IBlingOrderXml = {
			pedido: {
				cliente: {
					nome: pipedriveObj.creator_user_id.name,
					email: pipedriveObj.creator_user_id.email,
				},
				transporte: {
					transportadora: 'Transportadora Teste',
					tipoFrete: 'A',
					servicoCorreios: 'SEDEX',
				},
				volumes: {
					volume: {
						servico: 'SEDEX',
						codigoRastreamento: 'LP0123456789',
					},
				},
				items: {
					item: {
						codigo: pipedriveObj.id,
						descricao: 'Item Teste',
						un: 'Pc',
						qtde: '1',
						vlr_unit: pipedriveObj.value,
					},
				},
				parcelas: {
					parcela: [
						{
							data: '23/03/2021',
							vlr: pipedriveObj.value,
							obs: 'Teste obs 1',
						},
					],
				},
				vlr_frete: '0',
				vlr_desconto: '0',
				value: pipedriveObj.value,
				data: pipedriveObj.won_time,
			},
		};

		return jsonToXml('pedido', orderObjExample);
	}
}

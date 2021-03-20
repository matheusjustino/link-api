export interface IBlingOrderXml {
	pedido: {
		cliente: {
			nome: string;
			email: string;
		};
		transporte: {
			transportadora: string;
			tipoFrete: string;
			servicoCorreios: string;
		};
		volumes: {
			volume: {
				servico: string;
				codigoRastreamento: string;
			};
		};
		items: {
			item: {
				codigo: number;
				descricao: string;
				un: string;
				qtde: string;
				vlr_unit: number;
			};
		};
		parcelas: {
			parcela: [
				{
					data: string;
					vlr: number;
					obs: string;
				},
			];
		};
		vlr_frete: string;
		vlr_desconto: string;
		value: number;
		data: string;
	};
}

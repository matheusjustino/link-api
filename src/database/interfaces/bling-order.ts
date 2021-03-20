export interface IBlingOrder {
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
			valor: number;
		};
	};
}

export interface IBlingOrder {
	cliente: {
		nome: string;
		email: string;
	};

	transporte: {
		transportadora: string;
		tipoFrete: string;
		servico: string;
	};

	items: {
		item: {
			codigo: number;
			descricao: string;
			valor: number;
		};
	};
}

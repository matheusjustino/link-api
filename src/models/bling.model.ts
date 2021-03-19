export class BlingOrderModel {
	public cliente: {
		nome: string;
		email: string;
	};

	public transporte: {
		transportadora: 'Transportadora Teste';
		tipoFrete: 'A';
		servico: 'Correios';
	};

	public items: {
		item: {
			codigo: 1;
			descricao: 'Item Teste';
			valor: number;
		};
	};

	constructor(deal) {
		console.log(deal.value, this.items, this.cliente);
		this.cliente = {
			nome: deal.creator_user_id.name,
			email: deal.creator_user_id.email,
		};

		this.items.item = deal.value;
	}
}

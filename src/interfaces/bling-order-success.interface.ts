export interface IBlingOrderSuccess {
	numero: string;
	idPedido: number;
	codigo_rastreamento: {
		codigo_rastreamento: string;
	};
	volumes: [
		{
			service: string;
			codigoRastreamento: string;
		},
	];
	value: number;
}

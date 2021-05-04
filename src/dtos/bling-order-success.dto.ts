import { ApiProperty } from '@nestjs/swagger';

export class BlingOrderSuccessDto {
	@ApiProperty()
	public numero: string;

	@ApiProperty()
	public idPedido: number;

	@ApiProperty()
	public codigo_rastreamento: {
		codigo_rastreamento: string;
	};

	@ApiProperty()
	public volumes: [
		{
			service: string;
			codigoRastreamento: string;
		},
	];

	@ApiProperty()
	public value: number;
}

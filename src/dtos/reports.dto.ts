import { ApiProperty } from '@nestjs/swagger';

export class ReportsDto {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public totalAmount: number;

	@ApiProperty()
	public count: number;
}

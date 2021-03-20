import { ApiProperty } from '@nestjs/swagger';

export class DealDto {
	@ApiProperty()
	public title: string;

	@ApiProperty()
	public value: string;
}

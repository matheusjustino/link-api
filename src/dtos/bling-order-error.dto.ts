import { ApiProperty } from '@nestjs/swagger';

export class BlingOrderError {
	@ApiProperty()
	public cod: number;

	@ApiProperty()
	public msg: string;
}

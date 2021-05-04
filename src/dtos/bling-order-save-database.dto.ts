import { ApiProperty } from '@nestjs/swagger';

export class BlingOrderSaveDatabase {
	@ApiProperty()
	public _id: string;

	@ApiProperty()
	public date: string;

	@ApiProperty()
	public __v: string;

	@ApiProperty()
	public count: number;

	@ApiProperty()
	public totalAmount: number;

	@ApiProperty()
	public createdAt: string;

	@ApiProperty()
	public updatedAt: string;
}

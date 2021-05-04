import { ApiProperty } from '@nestjs/swagger';

export class PipedriveResponseDto {
	@ApiProperty()
	public id: number;

	@ApiProperty()
	public creator_user_id: {
		id: number;
		name: string;
		email: string;
	};

	@ApiProperty()
	public title?: string;

	@ApiProperty()
	public value: number;

	@ApiProperty()
	public status: string;

	@ApiProperty()
	public won_time: string;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum StatusEnum {
	open = 'Open',
	won = 'Won',
	lost = 'Lost',
	deleted = 'Deleted',
}

@Schema({ timestamps: true })
export class Deal extends Document {
	public _id: string;

	@Prop({ type: String, required: true })
	public title: string;

	@Prop({ type: String, enum: StatusEnum, default: StatusEnum.won })
	public status: string;

	@Prop({ type: String, default: '0' })
	public value: string;
}

export const DealSchemaProvide = Symbol('DealSchemaProvider').toString();
export const DealSchema = SchemaFactory.createForClass(Deal);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
	public _id: string;

	@Prop({ type: String, unique: true })
	public date: string;

	@Prop({ type: Number })
	public totalAmount: number;

	@Prop({ type: Number })
	public count: number;

	// @Prop({ type: String })
	// public numero: string;

	// @Prop({ type: Number })
	// public idPedido: number;

	// @Prop({ type: Array })
	// public codigos_rastreamento: Array<Object>;

	// @Prop({ type: Array })
	// public volumes: Array<any>;

	// @Prop({ type: Number })
	// public value: number;
}

export const OrderSchemaProvide = Symbol('OrderSchemaProvide').toString();
export const OrderSchema = SchemaFactory.createForClass(Order);

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { Order, OrderSchemaProvide } from './../schemas/order.schema';

@Injectable()
export class OrderRepository {
	constructor(
		@InjectModel(OrderSchemaProvide)
		private readonly OrderModel: Model<Order>,
	) {}

	public get orderModel(): Model<Order> {
		return this.OrderModel;
	}
}

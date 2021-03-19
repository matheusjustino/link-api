import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deal, DealSchemaProvide } from '../schemas/deal.schema';

@Injectable()
export class DealRepository {
	constructor(
		@InjectModel(DealSchemaProvide) private readonly DealModel: Model<Deal>,
	) {}

	public get dealModel(): Model<Deal> {
		return this.DealModel;
	}
}

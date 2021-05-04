import { AsyncModelFactory } from '@nestjs/mongoose';

// Schemas
import { DealSchema, DealSchemaProvide } from './schemas/deal.schema';
import { OrderSchema, OrderSchemaProvide } from './schemas/order.schema';

export const modelsProviderAsync: AsyncModelFactory[] = [
	{
		name: DealSchemaProvide,
		collection: 'deals',
		useFactory: () => DealSchema,
	},
	// {
	// 	name: OrderSchemaProvide,
	// 	collection: 'orders',
	// 	useFactory: () => OrderSchema,
	// },
	{
		name: OrderSchemaProvide,
		collection: 'opportunities',
		useFactory: () => OrderSchema,
	},
];

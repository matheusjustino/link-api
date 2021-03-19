import { AsyncModelFactory } from '@nestjs/mongoose';
import { DealSchema, DealSchemaProvide } from './schemas/deal.schema';

export const modelsProviderAsync: AsyncModelFactory[] = [
	{
		name: DealSchemaProvide,
		collection: 'deals',
		useFactory: () => DealSchema,
	},
];

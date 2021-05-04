import { Document } from 'mongoose';

export interface IDeal extends Document {
	title: string;
	status: string;
}

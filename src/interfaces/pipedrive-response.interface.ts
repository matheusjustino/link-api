export interface IPipedriveResponse {
	id: number;
	creator_user_id: {
		id: number;
		name: string;
		email: string;
	};
	title?: string;
	value: number;
	status: string;
	won_time: string;
}

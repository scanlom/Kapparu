export interface Transaction {
	id: number;
	date: string;
	type: number;
	subType: number;
	positionId: number;
	portfolioId: number;
	value: number;
	quantity: number;
	note: string;
}
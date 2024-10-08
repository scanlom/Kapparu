export interface Merger {
	id: number;
	date: string;
	acquirerRefDataId: number;
	targetRefDataId: number;
	dealPrice: number;
	failPrice: number;
	breakPrice: number;
	strikePrice: number;
	announceDate: string;
	meetingDate: string;
	closeDate: string;
	breakDate: string;
	confidence: number;
	cash: number;
	dividends: number;
	acquirerTicker: string;
	targetTicker: string;
	active: boolean;
}

export interface MergerJournal extends Merger {
	mergerId: number;
	entry: string;
}
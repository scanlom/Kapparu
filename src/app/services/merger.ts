export interface Merger {
	id: number;
	date: string;
	acquirerRefDataId: number;
	targetRefDataId: number;
	dealPrice: number;
	failPrice: number;
	breakPrice: number;
	announceDate: string;
	meetingDate: string;
	closeDate: string;
	breakDate: string;
	confidence: number;
	dividends: number;
	acquirerTicker: string;
	targetTicker: string;
}

export interface MergerJournal extends Merger {
	mergerId: number;
	entry: string;
}
export interface Merger {
	id: number;
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
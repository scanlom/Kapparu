export interface Projections {
  id: number;
  refDataId: number;
  date: string;
  eps: number;
  dps: number;
  growth: number;
  peTerminal: number;
  payout: number;
  book: number;
  roe: number;
  epsYr1: number;
  epsYr2: number;
  confidence: string;
}

export interface ProjectionsJournal extends Projections {
	projectionsId: number;
	entry: string;
}
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
  watch: boolean;
}

export interface ProjectionsJournal extends Projections {
	projectionsId: number;
  date: string;
	entry: string;
}
export interface Position {
  id: number;
  refDataId: number;
  portfolioId: number;
  quantity: number;
  price: number;
  value: number;
  index: number;
  divisor: number;
  costBasis: number;
  totalCashInfusion: number;
  accumulatedDividends: number;
  model: number;
  pricingType: number;
  active: boolean;
}
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Income } from '../fundamentals';
import { Balance } from '../fundamentals';
import { Cashflow } from '../fundamentals';
import { FundamentalsService } from '../fundamentals.service';

@Component({
  selector: 'app-fundamentals-mini-editor',
  templateUrl: './fundamentals-mini-editor.component.html',
  styleUrls: ['./fundamentals-mini-editor.component.css']
})
export class FundamentalsMiniEditorComponent {
  @Input() ticker: string;
  @Input() ccy: string;
  @Input() fiscalYear: number;
  @Input() reportDate: string;
  @Input() sharesDiluted: number;
  @Input() revenue: number;
  @Input() grossProfit: number;
  @Input() sellingGenAdmin: number;
  @Input() researchDev: number;
  @Input() deprAmor: number;
  @Input() operatingIncome: number;
  @Input() interestExpNet: number;
  @Input() incomeTax: number;
  @Input() netIncome: number;
  @Input() cashEquivStInvest: number;
  @Input() totalCurAssets: number;
  @Input() totalNoncurAssets: number;
  @Input() totalAssets: number;
  @Input() totalCurLiab: number;
  @Input() ltDebt: number;
  @Input() totalNoncurLiab: number;
  @Input() totalLiabilities: number;
  @Input() totalEquity: number;
  @Input() totalLiabEquity: number;
  @Input() netCashOps: number;
  @Input() chgFixAssetsInt: number;
  @Input() netCashInv: number;
  @Input() dividendsPaid: number;
  @Input() cashRepayDebt: number;
  @Input() cashRepurchaseEquity: number;
  @Input() netCashFin: number;
  @Input() netChgCash: number;

  constructor(private fundamentalsService: FundamentalsService) {
	console.log(this.fundamentalsService); // It is defined
 }

  addFundamentals() {
    this.fundamentalsService.addIncome({
	  ticker: this.ticker,
      simfinId: 0,
      ccy: this.ccy,
      fiscalYear: this.fiscalYear,
      fiscalPeriod: "FY",
      reportDate: this.reportDate,
      publishDate: this.reportDate,
      sharesBasic: 0,
      sharesDiluted: this.sharesDiluted,
      revenue: this.revenue,
      costRevenue: 0,
      grossProfit: this.grossProfit,
      operatingExpenses: 0,
      sellingGenAdmin: this.sellingGenAdmin * -1,
      researchDev: this.researchDev * -1,
      deprAmor: this.deprAmor * -1,
      operatingIncome: this.operatingIncome,
      nonOperatingIncome: 0,
      interestExpNet: this.interestExpNet * -1,
      pretaxIncomeLossAdj: 0,
      abnormGainLoss: 0,
      pretaxIncomeLoss: 0,
      incomeTax: this.incomeTax * -1,
      incomeContOp: 0,
      netExtrGainLoss: 0,
      netIncome: this.netIncome,
      netIncomeCommon: 0,
      entryType: "M",
    } as Income).subscribe();

    this.fundamentalsService.addBalance({
      ticker: this.ticker,
      simfinId: 0,
      ccy: this.ccy,
      fiscalYear: this.fiscalYear,
      fiscalPeriod: "FY",
      reportDate: this.reportDate,
      publishDate: this.reportDate,
      sharesBasic: 0,
      sharesDiluted: this.sharesDiluted,
      cashEquivStInvest: this.cashEquivStInvest,
      accNotesRecv: 0,
      inventories: 0,
      totalCurAssets: this.totalCurAssets,
      propPlantEquipNet: 0,
      ltInvestRecv: 0,
      otherLtAssets: 0,
      totalNoncurAssets: this.totalNoncurAssets,
      totalAssets: this.totalAssets,
      payablesAccruals: 0,
      stDebt: 0,
      totalCurLiab: this.totalCurLiab,
      ltDebt: this.ltDebt,
      totalNoncurLiab: this.totalNoncurLiab,
      totalLiabilities: this.totalLiabilities,
      shareCapitalAdd: 0,
      treasuryStock: 0,
      retainedEarnings: 0,
      totalEquity: this.totalEquity,
      totalLiabEquity: this.totalLiabEquity,
      entryType: "M",
    } as Balance).subscribe();

    this.fundamentalsService.addCashflow({
      ticker: this.ticker,
      simfinId: 0,
      ccy: this.ccy,
      fiscalYear: this.fiscalYear,
      fiscalPeriod: "FY",
      reportDate: this.reportDate,
      publishDate: this.reportDate,
      sharesBasic: 0,
      sharesDiluted: this.sharesDiluted,
      netIncomeStart: this.netIncome,
      deprAmor: this.deprAmor,
      nonCashItems: 0,
      chgWorkingCapital: 0,
      chgAccountsRecv: 0,
      chgInventories: 0,
      chgAccPayable: 0,
      chgOther: 0,
      netCashOps: this.netCashOps,
      chgFixAssetsInt: this.chgFixAssetsInt * -1,
      netChgLtInvest: 0,
      netCashAcqDivest: 0,
      netCashInv: this.netCashInv,
      dividendsPaid: this.dividendsPaid * -1,
      cashRepayDebt: this.cashRepayDebt * -1,
      cashRepurchaseEquity: this.cashRepurchaseEquity * -1,
      netCashFin: this.netCashFin,
      netChgCash: this.netChgCash,
      entryType: "M",
    } as Cashflow).subscribe();
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
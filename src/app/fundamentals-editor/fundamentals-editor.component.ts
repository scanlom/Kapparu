import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Income } from '../fundamentals';
import { Balance } from '../fundamentals';
import { Cashflow } from '../fundamentals';
import { FundamentalsService } from '../fundamentals.service';

@Component({
  selector: 'app-fundamentals-editor',
  templateUrl: './fundamentals-editor.component.html',
  styleUrls: ['./fundamentals-editor.component.css']
})
export class FundamentalsEditorComponent {
  @Input() ticker: string;
  @Input() simfinId: number;
  @Input() ccy: string;
  @Input() fiscalYear: number;
  @Input() fiscalPeriod: string;
  @Input() reportDate: string;
  @Input() publishDate: string;
  @Input() restatedDate: string;
  @Input() sharesBasic: number;
  @Input() sharesDiluted: number;
  @Input() revenue: number;
  @Input() costRevenue: number;
  @Input() grossProfit: number;
  @Input() operatingExpenses: number;
  @Input() sellingGenAdmin: number;
  @Input() researchDev: number;
  @Input() deprAmor: number;
  @Input() operatingIncome: number;
  @Input() nonOperatingIncome: number;
  @Input() interestExpNet: number;
  @Input() pretaxIncomeLossAdj: number;
  @Input() abnormGainLoss: number;
  @Input() pretaxIncomeLoss: number;
  @Input() incomeTax: number;
  @Input() incomeAffilNetTax: number;
  @Input() incomeContOp: number;
  @Input() netExtrGainLoss: number;
  @Input() netIncome: number;
  @Input() netIncomeCommon: number;
  @Input() cashEquivStInvest: number;
  @Input() accNotesRecv: number;
  @Input() inventories: number;
  @Input() totalCurAssets: number;
  @Input() propPlantEquipNet: number;
  @Input() ltInvestRecv: number;
  @Input() otherLtAssets: number;
  @Input() totalNoncurAssets: number;
  @Input() totalAssets: number;
  @Input() payablesAccruals: number;
  @Input() stDebt: number;
  @Input() totalCurLiab: number;
  @Input() ltDebt: number;
  @Input() totalNoncurLiab: number;
  @Input() totalLiabilities: number;
  @Input() preferredEquity: number;
  @Input() shareCapitalAdd: number;
  @Input() treasuryStock: number;
  @Input() retainedEarnings: number;
  @Input() totalEquity: number;
  @Input() totalLiabEquity: number;
  @Input() netIncomeStart: number;
  @Input() nonCashItems: number;
  @Input() chgWorkingCapital: number;
  @Input() chgAccountsRecv: number;
  @Input() chgInventories: number;
  @Input() chgAccPayable: number;
  @Input() chgOther: number;
  @Input() netCashOps: number;
  @Input() chgFixAssetsInt: number;
  @Input() netChgLtInvest: number;
  @Input() netCashAcqDivest: number;
  @Input() netCashInv: number;
  @Input() dividendsPaid: number;
  @Input() cashRepayDebt: number;
  @Input() cashRepurchaseEquity: number;
  @Input() netCashFin: number;
  @Input() effectFxRates: number;
  @Input() netChgCash: number;

  constructor(private fundamentalsService: FundamentalsService) {
	console.log(this.fundamentalsService); // It is defined
 }

  addFundamentals() {
    this.fundamentalsService.addIncome({
	  ticker: this.ticker,
      simfinId: this.simfinId,
      ccy: this.ccy,
      fiscalYear: this.fiscalYear,
      fiscalPeriod: this.fiscalPeriod,
      reportDate: this.reportDate,
      publishDate: this.publishDate,
      restatedDate: this.restatedDate,
      sharesBasic: this.sharesBasic,
      sharesDiluted: this.sharesDiluted,
      revenue: this.revenue,
      costRevenue: this.costRevenue * -1,
      grossProfit: this.grossProfit,
      operatingExpenses: this.operatingExpenses * -1,
      sellingGenAdmin: this.sellingGenAdmin * -1,
      researchDev: this.researchDev * -1,
      deprAmor: this.deprAmor * -1,
      operatingIncome: this.operatingIncome,
      nonOperatingIncome: this.nonOperatingIncome,
      interestExpNet: this.interestExpNet * -1,
      pretaxIncomeLossAdj: this.pretaxIncomeLossAdj,
      abnormGainLoss: this.abnormGainLoss,
      pretaxIncomeLoss: this.pretaxIncomeLoss,
      incomeTax: this.incomeTax * -1,
      incomeAffilNetTax: this.incomeAffilNetTax * -1,
      incomeContOp: this.incomeContOp,
      netExtrGainLoss: this.netExtrGainLoss,
      netIncome: this.netIncome,
      netIncomeCommon: this.netIncomeCommon,
      entryType: "M",
    } as Income).subscribe();

    this.fundamentalsService.addBalance({
      ticker: this.ticker,
      simfinId: this.simfinId,
      ccy: this.ccy,
      fiscalYear: this.fiscalYear,
      fiscalPeriod: this.fiscalPeriod,
      reportDate: this.reportDate,
      publishDate: this.publishDate,
      restatedDate: this.restatedDate,
      sharesBasic: this.sharesBasic,
      sharesDiluted: this.sharesDiluted,
      cashEquivStInvest: this.cashEquivStInvest,
      accNotesRecv: this.accNotesRecv,
      inventories: this.inventories,
      totalCurAssets: this.totalCurAssets,
      propPlantEquipNet: this.propPlantEquipNet,
      ltInvestRecv: this.ltInvestRecv,
      otherLtAssets: this.otherLtAssets,
      totalNoncurAssets: this.totalNoncurAssets,
      totalAssets: this.totalAssets,
      payablesAccruals: this.payablesAccruals,
      stDebt: this.stDebt,
      totalCurLiab: this.totalCurLiab,
      ltDebt: this.ltDebt,
      totalNoncurLiab: this.totalNoncurLiab,
      totalLiabilities: this.totalLiabilities,
      preferredEquity: this.preferredEquity,
      shareCapitalAdd: this.shareCapitalAdd,
      treasuryStock: this.treasuryStock,
      retainedEarnings: this.retainedEarnings,
      totalEquity: this.totalEquity,
      totalLiabEquity: this.totalLiabEquity,
      entryType: "M",
    } as Balance).subscribe();

    this.fundamentalsService.addCashflow({
      ticker: this.ticker,
      simfinId: this.simfinId,
      ccy: this.ccy,
      fiscalYear: this.fiscalYear,
      fiscalPeriod: this.fiscalPeriod,
      reportDate: this.reportDate,
      publishDate: this.publishDate,
      restatedDate: this.restatedDate,
      sharesBasic: this.sharesBasic,
      sharesDiluted: this.sharesDiluted,
      netIncomeStart: this.netIncomeStart,
      deprAmor: this.deprAmor,
      nonCashItems: this.nonCashItems,
      chgWorkingCapital: this.chgWorkingCapital,
      chgAccountsRecv: this.chgAccountsRecv,
      chgInventories: this.chgInventories,
      chgAccPayable: this.chgAccPayable,
      chgOther: this.chgOther,
      netCashOps: this.netCashOps,
      chgFixAssetsInt: this.chgFixAssetsInt,
      netChgLtInvest: this.netChgLtInvest,
      netCashAcqDivest: this.netCashAcqDivest,
      netCashInv: this.netCashInv,
      dividendsPaid: this.dividendsPaid,
      cashRepayDebt: this.cashRepayDebt,
      cashRepurchaseEquity: this.cashRepurchaseEquity,
      netCashFin: this.netCashFin,
      effectFxRates: this.effectFxRates,
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
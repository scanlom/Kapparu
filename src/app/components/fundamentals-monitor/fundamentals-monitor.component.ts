import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Projections } from 'src/app/services/projections';
import { ActivatedRoute, Router } from '@angular/router';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

export enum CurrentDisplay {
    summary = 1,
	income = 2,
    balance = 3,
    cashflow = 4,
    journal = 5,
}

@Component({
    selector: 'app-fundamentals-monitor',
    templateUrl: './fundamentals-monitor.component.html',
    styleUrls: ['./fundamentals-monitor.component.css']
})
export class FundamentalsMonitorComponent extends KapparuGridComponent {
  currentDisplay = CurrentDisplay.journal;
  currentDisplayType = CurrentDisplay;
  currentTicker = "BKNG";

	headlineOneColumnDefs = [
        {headerName: 'Ticker', field: 'ticker'},
        {headerName: 'Description', field: 'description'},
        {headerName: 'Sector', field: 'sector'},
        {headerName: 'Industry', field: 'industry'},
        {headerName: 'Price', field: 'price', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'PE', field: 'pe', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'DivPlusGrowth', field: 'divPlusGrowth', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'EPSYield', field: 'epsYield', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'DPSYield', field: 'dpsYield', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        this.colCAGR5yr,
        {headerName: 'CAGR10yr', field: 'cagr10yr', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'CROE5yr', field: 'croe5yr', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'CROE10yr', field: 'croe10yr', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
	]

	headlineTwoColumnDefs = [
        {headerName: 'PEHighMMO5yr', field: 'peHighMmo5yr', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'PELowMMO5yr', field: 'peLowMmo5yr', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'EPSCagr5yr', field: 'epsCagr5yr', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'EPSCagr10yr', field: 'epsCagr10yr', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'EPSCagr2yr', field: 'epsCagr2yr', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'EPSCagr7yr', field: 'epsCagr7yr', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'ROE5yr', field: 'roe5yr', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'Magic', field: 'magic', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter, headerTooltip: 'cagr5yr'},
	]

	projectionsColumnDefs = [
	    this.colUpdateDate,
        {headerName: 'EPS', field: 'eps', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'DPS', field: 'dps', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'Growth', field: 'growth', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'PETerminal', field: 'peTerminal', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'Payout', field: 'payout', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'Book', field: 'book', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'ROE', field: 'roe', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
        {headerName: 'EPSYr1', field: 'epsYr1', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'EPSYr2', field: 'epsYr2', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        this.colConfidence,
	]

    summaryColumnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: this.dateFormatter},
        {headerName: 'EPS', field: 'eps', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'DPS', field: 'dps', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'PEHigh', field: 'peHigh', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'PELow', field: 'peLow', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'ROE', field: 'roe', cellStyle: {textAlign: "right"}, valueFormatter: this.percentIntFormatter},
        {headerName: 'ROA', field: 'roa', cellStyle: {textAlign: "right"}, valueFormatter: this.percentIntFormatter},
        {headerName: 'GrMgn', field: 'grMgn', cellStyle: {textAlign: "right"}, valueFormatter: this.percentIntFormatter},
        {headerName: 'OpMgn', field: 'opMgn', cellStyle: {textAlign: "right"}, valueFormatter: this.percentIntFormatter},
        {headerName: 'NetMgn', field: 'netMgn', cellStyle: {textAlign: "right"}, valueFormatter: this.percentIntFormatter},
        {headerName: 'LTDRatio', field: 'ltdRatio', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'IntCov', field: 'intCov', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'MarketCap', field: 'marketCap', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'SharesDiluted', field: 'sharesDiluted', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
	]

    columnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: this.dateFormatter},
        {headerName: 'EPS', field: 'eps', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
        {headerName: 'Revenue', field: 'revenue', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'GrossProfit', field: 'grossProfit', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'OperatingIncome', field: 'operatingIncome', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'NonOperatingIncome', field: 'nonOperatingIncome', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'NetIncome', field: 'netIncome', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'NetIncomeCommon', field: 'netIncomeCommon', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'SharesDiluted', field: 'sharesDiluted', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'CostRevenue', field: 'costRevenue', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'OperatingExpenses', field: 'operatingExpenses', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'SellingGenAdmin', field: 'sellingGenAdmin', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'ResearchDev', field: 'researchDev', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'DeprAmor', field: 'deprAmor', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'InterestExpNet', field: 'interestExpNet', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'IncomeTax', field: 'incomeTax', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'PretaxIncomeLossAdj', field: 'pretaxIncomeLossAdj', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'AbnormGainLoss', field: 'abnormGainLoss', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'PretaxIncomeLoss', field: 'pretaxIncomeLoss', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'IncomeContOp', field: 'incomeContOp', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
        {headerName: 'NetExtrGainLoss', field: 'netExtrGainLoss', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
    ];

    balanceColumnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: this.dateFormatter},
		{headerName: 'CashEquivStInvest', field: 'cashEquivStInvest', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'AccNotesRecv', field: 'accNotesRecv', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'Inventories', field: 'inventories', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'TotalCurAssets', field: 'totalCurAssets', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'PropPlantEquipNet', field: 'propPlantEquipNet', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'LtInvestRecv', field: 'ltInvestRecv', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'OtherLtAssets', field: 'otherLtAssets', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'TotalNoncurAssets', field: 'totalNoncurAssets', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'TotalAssets', field: 'totalAssets', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'PayablesAccruals', field: 'payablesAccruals', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'StDebt', field: 'stDebt', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'TotalCurLiab', field: 'totalCurLiab', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'LtDebt', field: 'ltDebt', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'TotalNoncurLiab', field: 'totalNoncurLiab', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'TotalLiabilities', field: 'totalLiabilities', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'ShareCapitalAdd', field: 'shareCapitalAdd', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'TreasuryStock', field: 'treasuryStock', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'RetainedEarnings', field: 'retainedEarnings', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'TotalEquity', field: 'totalEquity', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'TotalLiabEquity', field: 'totalLiabEquity', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
    ];

    cashflowColumnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: this.dateFormatter},
        {headerName: 'DPS', field: 'dps', cellStyle: {textAlign: "right"}, valueFormatter: this.currencyFormatter},
		{headerName: 'NetIncomeStart', field: 'netIncomeStart', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'DeprAmor', field: 'deprAmor', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'NonCashItems', field: 'nonCashItems', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'ChgWorkingCapital', field: 'chgWorkingCapital', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'ChgAccountsRecv', field: 'chgAccountsRecv', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'ChgInventories', field: 'chgInventories', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'ChgAccPayable', field: 'chgAccPayable', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'ChgOther', field: 'chgOther', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'NetCashOps', field: 'netCashOps', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'ChgFixAssetsInt', field: 'chgFixAssetsInt', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'NetChgLtInvest', field: 'netChgLtInvest', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'NetCashAcqDivest', field: 'netCashAcqDivest', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'NetCashInv', field: 'netCashInv', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'DividendsPaid', field: 'dividendsPaid', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'CashRepayDebt', field: 'cashRepayDebt', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'CashRepurchaseEquity', field: 'cashRepurchaseEquity', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'NetCashFin', field: 'netCashFin', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
		{headerName: 'NetChgCash', field: 'netChgCash', cellStyle: {textAlign: "right"}, valueFormatter: this.numberFormatter},
    ];

	projectionsRowData: any;
    summaryRowData: any;
    balanceRowData: any;
    cashflowRowData: any;
    rowData: any;

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
        super()
    }

    ngOnInit() {
        if(this.route.snapshot.paramMap.has('ticker')) { 
            this.currentTicker = this.route.snapshot.paramMap.get('ticker');
        }
        this.rowData = this.http.get(environment.api + 'blue-lion/read/income?ticker=' + this.currentTicker);
        this.projectionsRowData = this.http.get<Projections>(environment.api + 'blue-lion/read/enriched-projections?symbol=' + this.currentTicker).pipe(
		    map((receivedData: Projections) => {
		        return Array.of( receivedData );
		    }));
        this.summaryRowData = this.http.get(environment.api + 'blue-lion/read/summary?ticker=' + this.currentTicker);
        this.balanceRowData = this.http.get(environment.api + 'blue-lion/read/balance?ticker=' + this.currentTicker);
        this.cashflowRowData = this.http.get(environment.api + 'blue-lion/read/cashflow?ticker=' + this.currentTicker);
    }

	onEnter(value: string) {
        // Change the url so on an update we come back to the right place
        this.router.navigate(['/fundamentals-monitor', { ticker: value }]);

        // Actually update the current screen
        this.currentTicker = value
		this.rowData = this.http.get(environment.api + 'blue-lion/read/income?ticker=' + this.currentTicker);
        this.projectionsRowData = this.http.get<Projections>(environment.api + 'blue-lion/read/enriched-projections?symbol=' + this.currentTicker).pipe(
		    map((receivedData: Projections) => {
		        return Array.of( receivedData );
		    }));
        this.summaryRowData = this.http.get(environment.api + 'blue-lion/read/summary?ticker=' + this.currentTicker);
        this.balanceRowData = this.http.get(environment.api + 'blue-lion/read/balance?ticker=' + this.currentTicker);
        this.cashflowRowData = this.http.get(environment.api + 'blue-lion/read/cashflow?ticker=' + this.currentTicker);
 	}

    onProjectionsChanged(params){
        this.ngOnInit()
    }
}
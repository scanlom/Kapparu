import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Projections } from './projections';
import { Headline } from './headline';
import * as moment from 'moment';

export enum CurrentDisplay {
    summary = 1,
	income = 2,
    balance = 3,
    cashflow = 4,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kapparu';
  currentDisplay = CurrentDisplay.summary;
  currentDisplayType = CurrentDisplay;

	headlineOneColumnDefs = [
        {headerName: 'Ticker', field: 'ticker'},
        {headerName: 'Description', field: 'description'},
        {headerName: 'Sector', field: 'sector'},
        {headerName: 'Industry', field: 'industry'},
        {headerName: 'Price', field: 'price', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'PE', field: 'pe', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'DivPlusGrowth', field: 'divPlusGrowth', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'EPSYield', field: 'epsYield', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'DPSYield', field: 'dpsYield', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'CAGR5yr', field: 'cagr5yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'CAGR10yr', field: 'cagr10yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'CROE5yr', field: 'croe5yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'CROE10yr', field: 'croe10yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
	]

	headlineTwoColumnDefs = [
        {headerName: 'PEHighMMO5yr', field: 'peHighMmo5yr', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'PELowMMO5yr', field: 'peLowMmo5yr', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'EPSCagr5yr', field: 'epsCagr5yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'EPSCagr10yr', field: 'epsCagr10yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'EPSCagr2yr', field: 'epsCagr2yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'EPSCagr7yr', field: 'epsCagr7yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'ROE5yr', field: 'roe5yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'Magic', field: 'magic', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter, headerTooltip: 'cagr5yr'},
	]

	projectionsColumnDefs = [
	    {headerName: 'Date', field: 'date', valueFormatter: dateFormatter},
        {headerName: 'EPS', field: 'eps', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'DPS', field: 'dps', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'Growth', field: 'growth', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'PETerminal', field: 'peTerminal', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'Payout', field: 'payout', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'Book', field: 'book', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'ROE', field: 'roe', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'EPSYr1', field: 'epsYr1', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'EPSYr2', field: 'epsYr2', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'EntryType', field: 'entryType', headerTooltip: 'D for Derived<br>O for Overridden'},
	]

    summaryColumnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: dateFormatter},
        {headerName: 'EPS', field: 'eps', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'DPS', field: 'dps', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'PEHigh', field: 'peHigh', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'PELow', field: 'peLow', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'ROE', field: 'roe', cellStyle: {textAlign: "right"}, valueFormatter: percentIntFormatter},
        {headerName: 'ROA', field: 'roa', cellStyle: {textAlign: "right"}, valueFormatter: percentIntFormatter},
        {headerName: 'GrMgn', field: 'grMgn', cellStyle: {textAlign: "right"}, valueFormatter: percentIntFormatter},
        {headerName: 'OpMgn', field: 'opMgn', cellStyle: {textAlign: "right"}, valueFormatter: percentIntFormatter},
        {headerName: 'NetMgn', field: 'netMgn', cellStyle: {textAlign: "right"}, valueFormatter: percentIntFormatter},
        {headerName: 'LTDRatio', field: 'ltdRatio', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'IntCov', field: 'intCov', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'MarketCap', field: 'marketCap', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'SharesDiluted', field: 'sharesDiluted', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
	]

    columnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: dateFormatter},
        {headerName: 'EPS', field: 'eps', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'Revenue', field: 'revenue', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'GrossProfit', field: 'grossProfit', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'OperatingIncome', field: 'operatingIncome', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'NonOperatingIncome', field: 'nonOperatingIncome', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'NetIncome', field: 'netIncome', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'NetIncomeCommon', field: 'netIncomeCommon', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'SharesDiluted', field: 'sharesDiluted', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'CostRevenue', field: 'costRevenue', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'OperatingExpenses', field: 'operatingExpenses', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'SellingGenAdmin', field: 'sellingGenAdmin', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'ResearchDev', field: 'researchDev', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'DeprAmor', field: 'deprAmor', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'InterestExpNet', field: 'interestExpNet', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'IncomeTax', field: 'incomeTax', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'PretaxIncomeLossAdj', field: 'pretaxIncomeLossAdj', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'AbnormGainLoss', field: 'abnormGainLoss', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'PretaxIncomeLoss', field: 'pretaxIncomeLoss', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'IncomeContOp', field: 'incomeContOp', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'NetExtrGainLoss', field: 'netExtrGainLoss', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
    ];

    balanceColumnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: dateFormatter},
		{headerName: 'CashEquivStInvest', field: 'cashEquivStInvest', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'AccNotesRecv', field: 'accNotesRecv', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'Inventories', field: 'inventories', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'TotalCurAssets', field: 'totalCurAssets', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'PropPlantEquipNet', field: 'propPlantEquipNet', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'LtInvestRecv', field: 'ltInvestRecv', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'OtherLtAssets', field: 'otherLtAssets', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'TotalNoncurAssets', field: 'totalNoncurAssets', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'TotalAssets', field: 'totalAssets', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'PayablesAccruals', field: 'payablesAccruals', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'StDebt', field: 'stDebt', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'TotalCurLiab', field: 'totalCurLiab', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'LtDebt', field: 'ltDebt', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'TotalNoncurLiab', field: 'totalNoncurLiab', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'TotalLiabilities', field: 'totalLiabilities', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'ShareCapitalAdd', field: 'shareCapitalAdd', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'TreasuryStock', field: 'treasuryStock', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'RetainedEarnings', field: 'retainedEarnings', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'TotalEquity', field: 'totalEquity', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'TotalLiabEquity', field: 'totalLiabEquity', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
    ];

    cashflowColumnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: dateFormatter},
        {headerName: 'DPS', field: 'dps', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
		{headerName: 'NetIncomeStart', field: 'netIncomeStart', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'DeprAmor', field: 'deprAmor', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'NonCashItems', field: 'nonCashItems', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'ChgWorkingCapital', field: 'chgWorkingCapital', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'ChgAccountsRecv', field: 'chgAccountsRecv', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'ChgInventories', field: 'chgInventories', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'ChgAccPayable', field: 'chgAccPayable', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'ChgOther', field: 'chgOther', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'NetCashOps', field: 'netCashOps', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'ChgFixAssetsInt', field: 'chgFixAssetsInt', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'NetChgLtInvest', field: 'netChgLtInvest', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'NetCashAcqDivest', field: 'netCashAcqDivest', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'NetCashInv', field: 'netCashInv', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'DividendsPaid', field: 'dividendsPaid', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'CashRepayDebt', field: 'cashRepayDebt', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'CashRepurchaseEquity', field: 'cashRepurchaseEquity', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'NetCashFin', field: 'netCashFin', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
		{headerName: 'NetChgCash', field: 'netChgCash', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
    ];

	headlineRowData: any;
	projectionsRowData: any;
    summaryRowData: any;
    balanceRowData: any;
    cashflowRowData: any;
    rowData: any;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.rowData = this.http.get('http://localhost:8081/blue-lion/read/income?ticker=BKNG');
        this.headlineRowData = this.http.get<Headline>('http://localhost:8081/blue-lion/read/headline?ticker=BKNG').pipe(
		    map((receivedData: Headline) => {
		        return Array.of( receivedData );
		    }));
        this.projectionsRowData = this.http.get<Projections>('http://localhost:8081/blue-lion/read/projections?symbol=BKNG').pipe(
		    map((receivedData: Projections) => {
		        return Array.of( receivedData );
		    }));
        this.summaryRowData = this.http.get('http://localhost:8081/blue-lion/read/summary?ticker=BKNG');
        this.balanceRowData = this.http.get('http://localhost:8081/blue-lion/read/balance?ticker=BKNG');
        this.cashflowRowData = this.http.get('http://localhost:8081/blue-lion/read/cashflow?ticker=BKNG');
    }

	onEnter(value: string) { 
		this.rowData = this.http.get('http://localhost:8081/blue-lion/read/income?ticker=' + value);
        this.headlineRowData = this.http.get<Headline>('http://localhost:8081/blue-lion/read/headline?ticker=' + value).pipe(
		    map((receivedData: Headline) => {
		        return Array.of( receivedData );
		    }));
        this.projectionsRowData = this.http.get<Projections>('http://localhost:8081/blue-lion/read/projections?symbol=' + value).pipe(
		    map((receivedData: Projections) => {
		        return Array.of( receivedData );
		    }));
        this.summaryRowData = this.http.get('http://localhost:8081/blue-lion/read/summary?ticker=' + value);
        this.balanceRowData = this.http.get('http://localhost:8081/blue-lion/read/balance?ticker=' + value);
        this.cashflowRowData = this.http.get('http://localhost:8081/blue-lion/read/cashflow?ticker=' + value);
 	}

	onGridReady(params){
		params.api.setHeaderHeight(25);
		var allColIds = params.columnApi.getAllColumns()
    		.map(column => column.colId);
		params.columnApi.autoSizeColumns(allColIds);
	}
	
	onRowDataChanged(params){
		this.onGridReady(params)
	}
}

function numberFormatter(params) {
	return params.value.toLocaleString();
}

function currencyFormatter(params) {
	return params.value.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});}

function percentFormatter(params) {
	return String((params.value * 100).toFixed(2)) + "%";
}

function percentIntFormatter(params) {
	return String((params.value * 100).toFixed(0)) + "%";
}

function dateFormatter(params) {
	return moment(params.value).format('YYYY- MM-DD');
}
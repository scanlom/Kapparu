import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  currentDisplay = CurrentDisplay.summary
  currentDisplayType = CurrentDisplay

	headlineColumnDefs = [
        {headerName: 'Ticker', field: 'ticker'},
        {headerName: 'EPSCagr5yr', field: 'epsCagr5yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'EPSCagr10yr', field: 'epsCagr10yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
        {headerName: 'PEHighMMO5yr', field: 'peHighMmo5yr', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'PELowMMO5yr', field: 'peLowMmo5yr', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
	]

    summaryColumnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: dateFormatter},
        {headerName: 'EPS', field: 'eps', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'DPS', field: 'dps', cellStyle: {textAlign: "right"}, valueFormatter: currencyFormatter},
        {headerName: 'PEHigh', field: 'peHigh', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'PELow', field: 'peLow', cellStyle: {textAlign: "right"}, valueFormatter: numberFormatter},
        {headerName: 'ROE', field: 'roe', cellStyle: {textAlign: "right"}, valueFormatter: percentIntFormatter},
        {headerName: 'ROA', field: 'roa', cellStyle: {textAlign: "right"}, valueFormatter: percentIntFormatter},
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
    summaryRowData: any;
    balanceRowData: any;
    cashflowRowData: any;
    rowData: any;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.rowData = this.http.get('http://localhost:8081/blue-lion/read/income?ticker=BKNG');
        this.headlineRowData = this.http.get('http://localhost:8081/blue-lion/read/headline?ticker=BKNG');
        this.summaryRowData = this.http.get('http://localhost:8081/blue-lion/read/summary?ticker=BKNG');
        this.balanceRowData = this.http.get('http://localhost:8081/blue-lion/read/balance?ticker=BKNG');
        this.cashflowRowData = this.http.get('http://localhost:8081/blue-lion/read/cashflow?ticker=BKNG');
    }

	onEnter(value: string) { 
		this.rowData = this.http.get('http://localhost:8081/blue-lion/read/income?ticker=' + value);
        this.headlineRowData = this.http.get('http://localhost:8081/blue-lion/read/headline?ticker=' + value);
        this.summaryRowData = this.http.get('http://localhost:8081/blue-lion/read/summary?ticker=' + value);
        this.balanceRowData = this.http.get('http://localhost:8081/blue-lion/read/balance?ticker=' + value);
        this.cashflowRowData = this.http.get('http://localhost:8081/blue-lion/read/cashflow?ticker=' + value);
 	}

	onGridReady(params){
		var allColIds = params.columnApi.getAllColumns()
    		.map(column => column.colId);
		params.columnApi.autoSizeColumns(allColIds);
	}

	onHeadlineGridReady(params){
		var allColIds = params.columnApi.getAllColumns()
    		.map(column => column.colId);
		params.columnApi.autoSizeColumns(allColIds);
	}

	onSummaryGridReady(params){
		var allColIds = params.columnApi.getAllColumns()
    		.map(column => column.colId);
		params.columnApi.autoSizeColumns(allColIds);
	}

	onBalanceGridReady(params){
		var allColIds = params.columnApi.getAllColumns()
    		.map(column => column.colId);
		params.columnApi.autoSizeColumns(allColIds);
	}

	onCashflowGridReady(params){
		var allColIds = params.columnApi.getAllColumns()
    		.map(column => column.colId);
		params.columnApi.autoSizeColumns(allColIds);
	}
}

function numberFormatter(params) {
	return params.value.toLocaleString();
}

function currencyFormatter(params) {
	return params.value.toFixed(2)
}

function percentFormatter(params) {
	return String((params.value * 100).toFixed(2)) + "%";
}

function percentIntFormatter(params) {
	return String((params.value * 100).toFixed(0)) + "%";
}

function dateFormatter(params) {
	return moment(params.value).format('YYYY- MM-DD');
}
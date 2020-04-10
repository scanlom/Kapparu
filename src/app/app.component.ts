import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kapparu';

    columnDefs = [
        {headerName: 'ReportDate', field: 'reportDate', valueFormatter: dateFormatter},
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

    rowData: any;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.rowData = this.http.get('http://localhost:8081/blue-lion/read/simfin-income?ticker=BKNG');
    }

	onEnter(value: string) { 
		this.rowData = this.http.get('http://localhost:8081/blue-lion/read/simfin-income?ticker=' + value);
 	}

	onGridReady(params){
		var allColIds = params.columnApi.getAllColumns()
    		.map(column => column.colId);
		params.columnApi.autoSizeColumns(allColIds);
	}
}

function numberFormatter(params) {
	return params.value.toLocaleString();
}

function dateFormatter(params) {
	return moment(params.value).format('YYYY- MM-DD');
}
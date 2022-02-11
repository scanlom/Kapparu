import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-watch-monitor',
  templateUrl: './watch-monitor.component.html',
  styleUrls: ['./watch-monitor.component.css']
})
export class WatchMonitorComponent {
  rowData: any;

  columnDefs = [
    { headerName: 'ID', field: 'id', hide: true },
    { headerName: 'Ticker', field: 'ticker' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Growth', field: 'growth', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: 'Div+Growth', field: 'divPlusGrowth', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: 'EYield', field: 'epsYield', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: 'DYield', field: 'dpsYield', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: '5 CAGR', field: 'cagr5yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: '10 CAGR', field: 'cagr10yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: '5 CROE', field: 'croe5yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: '10 CROE', field: 'croe10yr', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
		{
			headerName: 'Confidence', field: 'confidence', cellStyle: params => {
				switch (params.value) {
					case 'H':
						return { backgroundColor: 'green' };
					case 'M':
						return { backgroundColor: 'yellow' };
					case 'B':
						return { backgroundColor: 'gray' };
					case 'L':
						return { backgroundColor: 'red' };
				}
				return null;
			}
		},
  ];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.rowData = this.http.get('http://localhost:8081/blue-lion/read/enriched-projections');
  }

  onGridReady(params) {
    params.api.setHeaderHeight(25);
    var allColIds = params.columnApi.getAllColumns()
      .map(column => column.colId);
    params.columnApi.autoSizeColumns(allColIds);
  }

  onRowDataChanged(params) {
    this.onGridReady(params)
  }

  onRowDoubleClicked(params) {
    this.router.navigate(['/fundamentals-monitor', { ticker: params.data.ticker } ]);
  }
}

function numberFormatter(params) {
  return params.value.toLocaleString();
}

function currencyFormatter(params) {
  return params.value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function percentFormatter(params) {
  return String((params.value * 100).toFixed(2)) + "%";
}

function percentIntFormatter(params) {
  return String((params.value * 100).toFixed(0)) + "%";
}

function dateFormatter(params) {
  return moment(params.value).format('YYYY-MM-DD');
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
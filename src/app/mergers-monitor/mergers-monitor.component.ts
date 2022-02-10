import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-mergers-monitor',
  templateUrl: './mergers-monitor.component.html',
  styleUrls: ['./mergers-monitor.component.css']
})
export class MergersMonitorComponent {
  rowData: any;

  columnDefs = [
    { headerName: 'ID', field: 'id', hide: true },
    { headerName: 'Target', field: 'targetTicker' },
    { headerName: 'Description', field: 'targetDescription' },
    { headerName: 'Acquirer', field: 'acquirerTicker' },
    { headerName: 'Description', field: 'acquirerDescription' },
    { headerName: 'Net', field: 'marketNetReturn', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: 'Annualized', field: 'marketNetReturnAnnualized', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: 'Positive', field: 'marketPositiveReturn', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: 'Annualized', field: 'marketPositiveReturnAnnualized', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: 'Confidence', field: 'confidence', cellStyle: {textAlign: "right"}, valueFormatter: percentFormatter},
    { headerName: 'Close', field: 'closeDate' },
  ];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.rowData = this.http.get('http://localhost:8081/blue-lion/read/enriched-mergers');
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
    this.router.navigate(['/mergers-editor', { id: params.data.id } ]);
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
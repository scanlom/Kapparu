import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-watch-monitor',
  templateUrl: './watch-monitor.component.html',
  styleUrls: ['./watch-monitor.component.css']
})
export class WatchMonitorComponent extends KapparuGridComponent {
  rowData: any;

  columnDefs = [
    { headerName: 'ID', field: 'id', hide: true },
    this.colProjectionsDate,
    { headerName: 'Ticker', field: 'ticker' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Growth', field: 'growth', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'DivPlusGrowth', field: 'divPlusGrowth', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'EYield', field: 'epsYield', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'DYield', field: 'dpsYield', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    this.colCAGR5yr,
    { headerName: 'CAGR10yr', field: 'cagr10yr', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'CROE5Yr', field: 'croe5yr', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'CROE10yr', field: 'croe10yr', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    this.colConfidence,
  ];

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  ngOnInit() {
    this.rowData = this.http.get('http://localhost:8084/blue-lion/cache/enriched-projections');
  }

  onRowDoubleClicked(params) {
    this.router.navigate(['/fundamentals-monitor', { ticker: params.data.ticker }]);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
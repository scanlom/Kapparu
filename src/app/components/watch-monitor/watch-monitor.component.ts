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
  positionsData: any;
  positionsTotalData: any;
  watchData: any;
  researchData: any;

  defaultColDef = {
    // set filtering on for all columns
    filter: true,
  };

  columnDefs = [
    { headerName: 'ID', field: 'id', hide: true },
    this.colUpdateDate,
    { headerName: 'Ticker', field: 'ticker', width: 70 },
    { headerName: 'Description', field: 'description', width: 200 },
    { headerName: 'Growth', field: 'growth', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'DivPlusGrowth', field: 'divPlusGrowth', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'EYield', field: 'epsYield', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'DYield', field: 'dpsYield', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    this.colCAGR5yr,
    { headerName: 'CAGR10yr', field: 'cagr10yr', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'CROE5Yr', field: 'croe5yr', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'CROE10yr', field: 'croe10yr', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    this.colConfidence,
    { headerName: '% Selfie', field: 'percentPortfolio', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
  ];

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  ngOnInit() {
    this.positionsData = this.http.get('http://localhost:8084/blue-lion/cache/enriched-projections-positions');
    this.positionsTotalData = this.http.get('http://localhost:8084/blue-lion/cache/enriched-projections-positions-total');
    this.watchData = this.http.get('http://localhost:8084/blue-lion/cache/enriched-projections-watch');
    this.researchData = this.http.get('http://localhost:8084/blue-lion/cache/enriched-projections-research');
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
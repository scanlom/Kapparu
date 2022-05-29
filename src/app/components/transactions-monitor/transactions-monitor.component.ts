import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-transactions-monitor',
  templateUrl: './transactions-monitor.component.html',
  styleUrls: ['./transactions-monitor.component.css']
})
export class TransactionsMonitorComponent extends KapparuGridComponent {
  txns: any[] = [];

  columnDefs = [
    { headerName: 'Date', field: 'date', valueFormatter: this.dateFormatter },
    { headerName: 'Type', field: 'type', valueFormatter: this.transactionTypeFormatter },
    { headerName: 'Portfolio', field: 'portfolioId', valueFormatter: this.portfolioIdFormatter },
    { headerName: 'Symbol', field: 'positionAfter.symbol' },
    { headerName: 'Value', field: 'value', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'CostBasis', field: 'positionAfter.costBasis', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'TotalCashInfusion', field: 'positionAfter.totalCashInfusion', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'CumDivs', field: 'positionAfter.accumulatedDividends', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Index', field: 'positionAfter.index', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Divisor', field: 'positionAfter.divisor', cellStyle: { textAlign: "right" }, valueFormatter: this.divisorFormatter },
  ];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8081/blue-lion/read/transactions').subscribe(
      txns => this.txns = txns
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-position-monitor',
  templateUrl: './position-monitor.component.html',
  styleUrls: ['./position-monitor.component.css']
})
export class PositionMonitorComponent extends KapparuGridComponent {
  positionId: number;
  returns: any;
  txns: any[] = [];
  @Input() position: any;

  columnDefs = [
    this.colSymbol,
    this.colPrice,
    this.colQuantity,
    this.colValue,
  ];

  returnsColumnDefs = [
    this.colReturns('Day', 'oneDay'),
    this.colReturns('YTD', 'yearToDate'),
    this.colReturns('Week', 'oneWeek'),
    this.colReturns('Month', 'oneMonth'),
    this.colReturns('3 Month', 'threeMonths'),
    this.colReturns('Year', 'oneYear'),
    this.colReturns('5 Year', 'fiveYears'),
    this.colReturns('10 Year', 'tenYears'),
    { headerName: 'Profit YTD', field: 'profitYearToDate', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Profit Lifetime', field: 'profitLifetime', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  txnsColumnDefs = [
    this.colDate,
    this.colTransactionType,
    this.colQuantity,
    { headerName: 'Before', field: 'positionBefore.quantity', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'After', field: 'positionAfter.quantity', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    this.colValue,
    { headerName: 'Before', field: 'positionBefore.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'After', field: 'positionAfter.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'CostBasis', field: 'positionAfter.costBasis', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'TotalCashInfusion', field: 'positionAfter.totalCashInfusion', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'CumDivs', field: 'positionAfter.accumulatedDividends', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    {
      headerName: 'Profit',
      field: 'profit',
      width: this.valueWidth,
      valueGetter: params => params.data.positionAfter.value + params.data.positionAfter.accumulatedDividends - params.data.positionAfter.totalCashInfusion,
      cellStyle: { textAlign: "right" }, 
      valueFormatter: this.currencyFormatter,
    },  
    { headerName: 'Index', field: 'positionAfter.index', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Divisor', field: 'positionAfter.divisor', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.divisorFormatter },
    this.colTransactionSubType,
    this.colNote,
  ];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('positionId')) {
      this.positionId = +this.route.snapshot.paramMap.get('positionId');
    }
    this.http.get<any>(environment.api + '8081/blue-lion/read/enriched-positions/' + this.positionId).subscribe(
      position => this.position = position
    );
    this.http.get<any>(environment.api + '8081/blue-lion/read/position-returns/' + this.positionId).subscribe(
      returns => this.returns = returns
    );
    this.http.get<any[]>(environment.api + '8081/blue-lion/read/transactions?positionId=' + this.positionId).subscribe(
      txns => this.txns = txns
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
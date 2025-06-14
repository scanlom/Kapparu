import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
    selector: 'app-portfolio-monitor',
    templateUrl: './portfolio-monitor.component.html',
    styleUrls: ['./portfolio-monitor.component.css'],
    standalone: false
})
export class PortfolioMonitorComponent extends KapparuGridComponent {
  portfolioId = 1;
  positions: any[] = [];
  txns: any[] = [];
  returns: any;
  @Input() rowData: any;

  columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Value', field: 'value', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Model', field: 'model', width: 70, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    this.colActual('percentTotal'),
    { headerName: 'Cash', field: 'cash', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: '%', field: 'percentCash', width: 70, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
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

  positionColumnDefs = [
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Price', field: 'price', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Quantity', field: 'quantity', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Value', field: 'value', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Model', field: 'model', width: 70, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    this.colActual('percentPortfolio'),
  ];

  txnColumnDefs = [
    this.colDate,
    this.colTransactionType,
    this.colValue,
    { headerName: 'Before', field: 'portfolioBefore.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'After', field: 'portfolioAfter.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'TotalCashInfusion', field: 'portfolioAfter.totalCashInfusion', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    {
      headerName: 'Profit',
      field: 'profit',
      width: this.valueWidth,
      valueGetter: params => params.data.portfolioAfter.value - params.data.portfolioAfter.totalCashInfusion,
      cellStyle: { textAlign: "right" }, 
      valueFormatter: this.currencyFormatter,
    },  
    { headerName: 'Index', field: 'portfolioAfter.index', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Divisor', field: 'portfolioAfter.divisor', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.divisorFormatter },
  ];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('portfolioId')) {
      this.portfolioId = +this.route.snapshot.paramMap.get('portfolioId');
    }
    this.rowData = this.http.get<any>(environment.api + 'blue-lion/read/enriched-portfolios/' + this.portfolioId).pipe(
      map((receivedData: any) => {
        return Array.of(receivedData);
      }));
    this.http.get<any>(environment.api + 'blue-lion/read/portfolio-returns/' + this.portfolioId).subscribe(
      returns => this.returns = returns
    );
    this.http.get<any[]>(environment.api + 'blue-lion/read/enriched-positions?portfolioId=' + this.portfolioId).subscribe(
      positions => this.positions = positions
    );
    this.http.get<any[]>(environment.api + 'blue-lion/read/transactions?portfolioId=' + this.portfolioId).subscribe(
      txns => this.txns = txns
    );
  }

  onPositionRowDoubleClicked(params) {
    this.router.navigate(['/position-monitor', { positionId: params.data.id }]);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
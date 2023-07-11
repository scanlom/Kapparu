import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Transaction } from 'src/app/services/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-transactions-monitor',
  templateUrl: './transactions-monitor.component.html',
  styleUrls: ['./transactions-monitor.component.css']
})
export class TransactionsMonitorComponent extends KapparuGridComponent {
  txns: any[] = [];
  @Input() date = moment().format("YYYY-MM-DD");
  @Input() type = 0;
  @Input() subType = 0;
  @Input() positionId = 0;
  @Input() portfolioId = 0;
  @Input() value = 0;
  @Input() quantity = 0;
  @Input() note = "";

  defaultColDef = {
    // set filtering on for all columns
    filter: true,
  };

  columnDefs = [
    { headerName: 'Date', field: 'date', width: this.dateWidth, valueFormatter: this.dateFormatter },
    { headerName: 'Type', field: 'type', width: this.tickerWidth, valueFormatter: this.transactionTypeFormatter },
    { headerName: 'Portfolio', field: 'portfolioId', width: this.tickerWidth, valueFormatter: this.portfolioIdFormatter },
    { headerName: 'Symbol', field: 'positionAfter.symbol', width: this.tickerWidth },
    { headerName: 'TxnQty', field: 'quantity', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'TxnValue', field: 'value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosBCostBasis', field: 'positionBefore.costBasis', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosBTCI', field: 'positionBefore.totalCashInfusion', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosBCumDivs', field: 'positionBefore.accumulatedDividends', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosBQty', field: 'positionBefore.quantity', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosBValue', field: 'positionBefore.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosBDivisor', field: 'positionBefore.divisor', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.divisorFormatter },
    { headerName: 'PosBIndex', field: 'positionBefore.index', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosACostBasis', field: 'positionAfter.costBasis', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosATCI', field: 'positionAfter.totalCashInfusion', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosACumDivs', field: 'positionAfter.accumulatedDividends', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosAQuantity', field: 'positionAfter.quantity', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosAValue', field: 'positionAfter.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PosADivisor', field: 'positionAfter.divisor', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.divisorFormatter },
    { headerName: 'PosAIndex', field: 'positionAfter.index', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PortBTCI', field: 'portfolioAfter.totalCashInfusion', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PortBValue', field: 'portfolioBefore.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PortBDivisor', field: 'portfolioBefore.divisor', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.divisorFormatter },
    { headerName: 'PortBIndex', field: 'portfolioBefore.index', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PortATCI', field: 'portfolioAfter.totalCashInfusion', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PortAValue', field: 'portfolioAfter.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'PortADivisor', field: 'portfolioAfter.divisor', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.divisorFormatter },
    { headerName: 'PortAIndex', field: 'portfolioAfter.index', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private transactionService: TransactionService) {
    super();
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8081/blue-lion/read/transactions').subscribe(
      txns => this.txns = txns
    );
  }

  book() {
		const that = this;
		this.transactionService.bookTransaction({
      date: this.date,
      type: this.type,
      subType: this.subType,
      positionId: this.positionId,
      portfolioId: this.portfolioId,
      value: this.value,
      quantity: this.quantity,
      note: this.note,
		} as Transaction).subscribe({
			next(t) {
				that.ngOnInit();
			}
		});
	}
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
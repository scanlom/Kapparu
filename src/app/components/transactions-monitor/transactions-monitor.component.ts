import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { environment } from 'src/environments/environment';
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
  response = "Ready Player One!";
  @Input() date: string;
  @Input() type: number;
  @Input() subType: number;
  @Input() positionId: number;
  @Input() portfolioId: number;
  @Input() value: number;
  @Input() quantity: number;
  @Input() note: string;

  defaultColDef = {
    // set filtering on for all columns
    filter: true,
  };

  columnDefs = [
    { headerName: 'Date', field: 'date', width: this.dateWidth, valueFormatter: this.dateFormatter },
    { headerName: 'Type', field: 'type', width: this.tickerWidth, valueFormatter: this.transactionTypeFormatter },
    this.colTransactionSubType,
    { headerName: 'Portfolio', field: 'portfolioId', width: this.tickerWidth, valueFormatter: this.portfolioIdFormatter },
    { headerName: 'Symbol', field: 'positionAfter.symbol', width: this.tickerWidth },
    this.colQuantity,
    { headerName: 'Before', field: 'positionBefore.quantity', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'After', field: 'positionAfter.quantity', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    this.colValue,
    { headerName: 'Before', field: 'positionBefore.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'After', field: 'positionAfter.value', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    this.colNote,
  ];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private transactionService: TransactionService) {
    super();
  }

  ngOnInit() {
    this.date =  moment().format("YYYY-MM-DD");
    this.note = "";

    this.http.get<any[]>(environment.api + 'blue-lion/read/transactions').subscribe(
      txns => this.txns = txns
    );
  }

  book() {
		const that = this;
		this.transactionService.bookTransaction({
      id: 0,
      date: this.date,
      type: +this.type,
      subType: +this.subType,
      positionId: +this.positionId,
      portfolioId: +this.portfolioId,
      value: +this.value,
      quantity: +this.quantity,
      note: this.note,
		} as Transaction).subscribe({
			next(t) {
        if (t.id > 0) {
          that.response = "Success: Transaction " + t.id;
        } else {
          that.response = "Error: Please check console"
        }
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
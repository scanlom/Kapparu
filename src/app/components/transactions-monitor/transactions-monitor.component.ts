import { HttpClient } from '@angular/common/http';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { environment } from 'src/environments/environment';
import { Transaction } from 'src/app/services/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
    selector: 'app-transactions-monitor',
    templateUrl: './transactions-monitor.component.html',
    styleUrls: ['./transactions-monitor.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TransactionsMonitorComponent extends KapparuGridComponent {
  @Input() date!: string;
  @Input() type!: number;
  @Input() subType!: number;
  @Input() positionId!: number;
  @Input() portfolioId!: number;
  @Input() value!: number;
  @Input() quantity!: number;
  @Input() note!: string;

  txns: any[] = [];
  portfolios: any[] = [];
  positions: any[] = [];
  response = "Ready Player One!";
  isBookEnabled: boolean = false;
  isSubTypeEnabled: boolean = false;
  isPortfolioIdEnabled: boolean = false;
  isPositionIdEnabled: boolean = false;
  isQuantityEnabled: boolean = false;

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

  onTypeUpdate(newValue: number) {
    this.subType = 0;
    this.checkBookEnabled();
    this.isSubTypeEnabled = newValue === 3;
    this.isPortfolioIdEnabled = true;
    this.isPositionIdEnabled = newValue <= 3;
    this.isQuantityEnabled = newValue <= 2;
    if (newValue > 2) {
      this.quantity = 0;
    }
    if (newValue <= 3) {
      this.http.get<any[]>(environment.api + 'blue-lion/read/portfolios').subscribe(
        portfolios => this.portfolios = portfolios.filter(p => p.total === false)
      );
    } else if (newValue === 4) {
      this.http.get<any[]>(environment.api + 'blue-lion/read/portfolios').subscribe(
        portfolios => this.portfolios = portfolios
      ); 
    } else {
      this.http.get<any[]>(environment.api + 'blue-lion/read/portfolios').subscribe(
        portfolios => this.portfolios = portfolios.filter(p => p.total === true)
      );
    }
  }

  onPortfolioIdUpdate(newValue: number) {
    this.checkBookEnabled();
    this.http.get<any[]>(environment.api + 'blue-lion/read/enriched-positions?portfolioId=' + newValue).subscribe(
      positions => this.positions = positions
    );
  }

  onPositionIdUpdate(newValue: number) {
    this.checkBookEnabled();
  }

  onValueUpdate(newValue: number) {
    this.checkBookEnabled();
  }

  checkBookEnabled() {
    this.isBookEnabled = 
      this.type <= 3 && this.portfolioId > 0 && this.positionId > 0 && !!this.value ||
      this.type >= 4 && this.portfolioId > 0 && !!this.value;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
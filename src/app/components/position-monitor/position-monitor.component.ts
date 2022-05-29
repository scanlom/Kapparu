import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { map } from 'rxjs';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-position-monitor',
  templateUrl: './position-monitor.component.html',
  styleUrls: ['./position-monitor.component.css']
})
export class PositionMonitorComponent extends KapparuGridComponent {
  positionId: number;
  txns: any[] = [];
  @Input() position: any;

  columnDefs = [
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Value', field: 'value', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  txnsColumnDefs = [
    { headerName: 'Date', field: 'date', valueFormatter: this.dateFormatter },
    { headerName: 'Type', field: 'type', valueFormatter: this.transactionTypeFormatter },
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
    if (this.route.snapshot.paramMap.has('positionId')) {
      this.positionId = +this.route.snapshot.paramMap.get('positionId');
    }
    this.http.get<any>('http://localhost:8081/blue-lion/read/enriched-positions/' + this.positionId).subscribe(
      position => this.position = position
    );
    this.http.get<any[]>('http://localhost:8081/blue-lion/read/transactions?positionId=' + this.positionId).subscribe(
      txns => this.txns = txns
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
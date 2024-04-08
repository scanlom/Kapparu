import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSummaryComponent extends KapparuGridComponent implements OnChanges {
  @Input() historyMode = false;
  @Input() positions: any[] = [];
  @Input() rowData: any;

  columnDefs = [
    { headerName: 'Name', field: 'name', width: 70 },
    { headerName: 'Value', field: 'value', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Model', field: 'model', width: 70, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    this.colActual('percentTotal'),
  ];

  totalColumnDefs = [
    { headerName: 'Name', field: 'name', width: 70 },
    { headerName: 'Value', field: 'value', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'ValueTC', field: 'valueTotalCapital', width: 150, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Cash', field: 'cash', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: '%', field: 'percentCash', width: 70, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Debt', field: 'debt', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: '%', field: 'percentDebt', width: 70, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
  ];

  positionColumnDefs = [
    { headerName: 'Symbol', field: 'symbol', width: 70 },
    { headerName: 'Value', field: 'value', width: 100, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'Model', field: 'model', width: 70, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    this.colActual('percentPortfolio'),
  ];

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rowData && changes.rowData.currentValue) {
      if (this.historyMode) {
        this.http.get<any[]>(environment.api + 'blue-lion/read/enriched-positions-history?portfolioId=' + this.rowData[0].portfolioId + '&date=' + this.rowData[0].date).subscribe(
          positions => { this.positions = positions; this.cdr.detectChanges(); }
        );
      } else {
        this.http.get<any[]>(environment.api + 'blue-lion/read/enriched-positions?portfolioId=' + this.rowData[0].id).subscribe(
          positions => { 
            this.positions = positions;
            if (this.positions.length > 0) {
              this.positions.push({ 
                'symbol': 'Total', 
                'value': this.positions.reduce((sum, current) => sum + current.value, 0),
                'model': this.positions.reduce((sum, current) => sum + current.model, 0), 
                'percentPortfolio': this.positions.reduce((sum, current) => sum + current.percentPortfolio, 0) 
              });
            }
            this.cdr.detectChanges(); }
        );

      }
    }
  }

  onPortfolioRowDoubleClicked(params) {
    if (this.historyMode) {
      this.router.navigate(['/portfolio-monitor', { portfolioId: params.data.portfolioId }]);
    } else {
      this.router.navigate(['/portfolio-monitor', { portfolioId: params.data.id }]);
    }
  }

  onPositionRowDoubleClicked(params) {
    if (this.historyMode) {
      this.router.navigate(['/position-monitor', { positionId: params.data.positionId }]);
    } else {
      this.router.navigate(['/position-monitor', { positionId: params.data.id }]);
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
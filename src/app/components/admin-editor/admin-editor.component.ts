import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefDataEditorComponent } from 'src/app/components/ref-data-editor/ref-data-editor.component';
import { MarketDataEditorComponent } from 'src/app/components/market-data-editor/market-data-editor.component';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css']
})
export class AdminEditorComponent extends KapparuGridComponent {
  positions: any[] = [];

  defaultColDef = {
    filter: true,
    sortable: true,
  };

  positionsColumnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Active', field: 'active' },
    { headerName: 'Portfolio', field: 'portfolioId', width: this.tickerWidth, valueFormatter: this.portfolioIdFormatter },    
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Value', field: 'value', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'TotalCashInfusion', field: 'totalCashInfusion', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    { headerName: 'AccumulatedDividends', field: 'accumulatedDividends', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
    {
      headerName: 'Profit',
      field: 'profit',
      valueGetter: params => params.data.value + params.data.accumulatedDividends - params.data.totalCashInfusion,
      cellStyle: { textAlign: "right" }, 
      valueFormatter: this.currencyFormatter,
    },  
    { headerName: 'Index', field: 'index', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8081/blue-lion/read/enriched-positions-all').subscribe(
      positions => this.positions = positions
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
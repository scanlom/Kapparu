import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
    selector: 'app-admin-editor',
    templateUrl: './admin-editor.component.html',
    styleUrls: ['./admin-editor.component.css'],
    standalone: false
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
      valueGetter: params => {
        var ret = 0
        if (params.data.divisor != 0) {
          ret = params.data.value + params.data.accumulatedDividends - params.data.totalCashInfusion
        }
        return ret
      },
      cellStyle: { textAlign: "right" }, 
      valueFormatter: this.currencyFormatter,
    },  
    { headerName: 'Index', field: 'index', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.http.get<any[]>(environment.api + 'blue-lion/read/enriched-positions-all').subscribe(
      positions => this.positions = positions
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
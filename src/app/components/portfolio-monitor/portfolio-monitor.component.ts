import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-portfolio-monitor',
  templateUrl: './portfolio-monitor.component.html',
  styleUrls: ['./portfolio-monitor.component.css']
})
export class PortfolioMonitorComponent extends KapparuGridComponent implements OnChanges  {
  positions: any[] = [];
  @Input() rowData: any;

  columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Value', field: 'value', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];  
  
  positionColumnDefs = [
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Value', field: 'value', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

	ngOnChanges(changes: SimpleChanges) {
		if (changes.rowData && changes.rowData.currentValue) {
			this.http.get<any[]>('http://localhost:8081/blue-lion/read/enriched-positions?portfolioId=' + this.rowData[0].id).subscribe(
				positions => this.positions = positions
			);
		}
	}
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
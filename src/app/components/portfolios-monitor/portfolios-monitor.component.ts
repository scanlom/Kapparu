import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-portfolios-monitor',
  templateUrl: './portfolios-monitor.component.html',
  styleUrls: ['./portfolios-monitor.component.css']
})
export class PortfoliosMonitorComponent extends KapparuGridComponent {
  rowData: any;

  columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Value', field: 'value', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  ngOnInit() {
    this.rowData = this.http.get('http://localhost:8081/blue-lion/read/portfolios');
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-portfolios-monitor',
  templateUrl: './portfolios-monitor.component.html',
  styleUrls: ['./portfolios-monitor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfoliosMonitorComponent extends KapparuGridComponent {
  @Input() portfolios: any[] = [];
  @Input() returns: any[] = [];

  columnDefs = [
    { headerName: 'Name', field: 'name', width: 150 },
    this.colReturns( 'Day',  'oneDay' ),
    this.colReturns( 'Week',  'oneWeek' ),
    this.colReturns( 'Month',  'oneMonth' ),
    this.colReturns( '3 Month',  'threeMonths' ),
    this.colReturns( 'Year',  'oneYear' ),
    this.colReturns( '5 Year',  'fiveYears' ),
    this.colReturns( '10 Year',  'tenYears' ),
  ];  

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8081/blue-lion/read/portfolios').subscribe(
      portfolios => this.portfolios = portfolios
    );
    this.http.get<any[]>('http://localhost:8081/blue-lion/read/portfolio-returns').subscribe(
      returns => { this.returns = returns;  this.cdr.detectChanges(); }
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
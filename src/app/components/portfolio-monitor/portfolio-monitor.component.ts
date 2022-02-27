import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { map } from 'rxjs';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-portfolio-monitor',
  templateUrl: './portfolio-monitor.component.html',
  styleUrls: ['./portfolio-monitor.component.css']
})
export class PortfolioMonitorComponent extends KapparuGridComponent {
  portfolioId = 1;
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

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('portfolioId')) {
      this.portfolioId = +this.route.snapshot.paramMap.get('portfolioId');
    }
    this.rowData = this.http.get<any>('http://localhost:8081/blue-lion/read/enriched-portfolios/' + this.portfolioId).pipe(
      map((receivedData: any) => {
        return Array.of(receivedData);
      }));
    this.http.get<any[]>('http://localhost:8081/blue-lion/read/enriched-positions?portfolioId=' + this.portfolioId).subscribe(
      positions => this.positions = positions
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
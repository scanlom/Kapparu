import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-portfolios-monitor',
  templateUrl: './portfolios-monitor.component.html',
  styleUrls: ['./portfolios-monitor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfoliosMonitorComponent extends KapparuGridComponent {
  historyMode = false;
  date = "";
  @Input() portfolios: any[] = [];
  @Input() returns: any[] = [];

  columnDefs = [
    { headerName: 'Name', field: 'name', width: 150 },
    this.colReturns('Day', 'oneDay'),
    this.colReturns('YTD', 'yearToDate'),
    this.colReturns('Week', 'oneWeek'),
    this.colReturns('Month', 'oneMonth'),
    this.colReturns('3 Month', 'threeMonths'),
    this.colReturns('Year', 'oneYear'),
    this.colReturns('5 Year', 'fiveYears'),
    this.colReturns('10 Year', 'tenYears'),
  ];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('date')) {
      this.historyMode = true;
      this.route.paramMap.subscribe(paramMap => {
        this.date = paramMap.get('date');
        this.http.get<any[]>(environment.api + 'blue-lion/read/portfolios-history?date=' + this.date).subscribe(
          portfolios => { this.portfolios = portfolios; this.cdr.detectChanges(); }
        );
        this.http.get<any[]>(environment.api + 'blue-lion/read/portfolio-returns?date=' + this.date).subscribe(
          returns => { this.returns = returns; this.cdr.detectChanges(); }
        );
      });
    }
    else {
      this.http.get<any[]>(environment.api + 'blue-lion/read/enriched-portfolios').subscribe(
        portfolios => { this.portfolios = portfolios; this.cdr.detectChanges(); }
      );
      this.http.get<any[]>(environment.api + 'blue-lion/read/portfolio-returns').subscribe(
        returns => { this.returns = returns; this.cdr.detectChanges(); }
      );
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
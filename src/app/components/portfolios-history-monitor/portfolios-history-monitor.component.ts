import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-portfolios-history-monitor',
    templateUrl: './portfolios-history-monitor.component.html',
    styleUrls: ['./portfolios-history-monitor.component.css'],
    standalone: false
})
export class PortfoliosHistoryMonitorComponent {
  @Input() date: Date;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.http.get<any>(environment.api + 'blue-lion/read/portfolios-history-max-date').subscribe(
      params => { 
        this.date = new Date(params.value);
        this.router.navigate(['portfolios-monitor', { date: this.date.toLocaleDateString('en-CA').slice(0, 10) }], {relativeTo: this.route});
      }
    );
  }

  onDateChange(event) {
    this.router.navigate(['portfolios-monitor', { date: this.date.toLocaleDateString('en-CA').slice(0, 10) }], {relativeTo: this.route});
  }

  onClickDownOneDay(event) {
    var foo = new Date(this.date)
    foo.setDate(this.date.getDate() - 1)
    this.date = foo
    this.router.navigate(['portfolios-monitor', { date: this.date.toLocaleDateString('en-CA').slice(0, 10) }], {relativeTo: this.route});
  }

  onClickUpOneDay(event) {
    var foo = new Date(this.date)
    foo.setDate(this.date.getDate() + 1)
    this.date = foo
    this.router.navigate(['portfolios-monitor', { date: this.date.toLocaleDateString('en-CA').slice(0, 10) }], {relativeTo: this.route});
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
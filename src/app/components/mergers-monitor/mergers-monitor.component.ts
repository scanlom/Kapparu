import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Merger } from 'src/app/services/merger';
import { MergerService } from 'src/app/services/merger.service';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-mergers-monitor',
  templateUrl: './mergers-monitor.component.html',
  styleUrls: ['./mergers-monitor.component.css']
})
export class MergersMonitorComponent extends KapparuGridComponent {
  positionsData: any;
  positionsTotalData: any;
  researchData: any;
  @Input() acquirerTicker: string;
  @Input() targetTicker: string;
  @Input() dealPrice: number;
  @Input() failPrice: number;
  @Input() announceDate: string;
  @Input() closeDate: string;
  @Input() confidence: number;
  @Input() dividends: number;

  columnDefsPortfolio = [
    { headerName: 'ID', field: 'id', hide: true },
    this.colUpdateDate,
    { headerName: 'Target', field: 'targetTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'targetDescription', width: this.descriptionWidth },
    { headerName: 'Acquirer', field: 'acquirerTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'acquirerDescription', width: this.descriptionWidth },
    { headerName: 'Net', field: 'marketNetReturn', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    this.colMergersNetAnnualized,
    { headerName: 'Positive', field: 'marketPositiveReturn', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Annualized', field: 'marketPositiveReturnAnnualized', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Confidence', field: 'confidence', width: this.tickerWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Close', field: 'closeDate', width: this.dateWidth, valueFormatter: this.dateFormatter },
    { headerName: '% Portfolio', field: 'percentPortfolio', width: this.percentWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
  ];

  columnDefsWatch = [
    { headerName: 'ID', field: 'id', hide: true },
    this.colDate,
    { headerName: 'Target', field: 'targetTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'targetDescription', width: this.descriptionWidth },
    { headerName: 'Acquirer', field: 'acquirerTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'acquirerDescription', width: this.descriptionWidth },
    { headerName: 'Net', field: 'marketNetReturn', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    this.colMergersNetAnnualized,
    { headerName: 'Positive', field: 'marketPositiveReturn', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Annualized', field: 'marketPositiveReturnAnnualized', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Confidence', field: 'confidence', width: this.tickerWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Close', field: 'closeDate', width: this.dateWidth, valueFormatter: this.dateFormatter },
    { headerName: '% Portfolio', field: 'percentPortfolio', width: this.percentWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Status', field: 'status', width: this.tickerWidth },
  ];

  constructor(private http: HttpClient, private router: Router, private mergerService: MergerService) {
    super()
  }

  ngOnInit() {
    this.positionsData = this.http.get('http://localhost:8081/blue-lion/read/enriched-mergers-positions');
    this.positionsTotalData = this.http.get('http://localhost:8081/blue-lion/read/enriched-mergers-positions-total');
    this.researchData = this.http.get('http://localhost:8081/blue-lion/read/enriched-mergers-research');
  }

  onRowDoubleClicked(params) {
    this.router.navigate(['/mergers-editor', { id: params.data.id } ]);
  }

  addMerger() {
		const that = this;
		this.mergerService.addMerger({
      date: moment().format("YYYY-MM-DD"),
      acquirerTicker: this.acquirerTicker,
      targetTicker: this.targetTicker,
      dealPrice: this.dealPrice,
      failPrice: this.failPrice,
      announceDate: this.announceDate,
      closeDate: this.closeDate,
      breakDate: "1900-01-01",
      meetingDate: "1900-01-01",
      confidence: this.confidence,
      dividends: this.dividends,
		} as Merger).subscribe({
			next(m) {
				that.ngOnInit();
			}
		});
	}
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
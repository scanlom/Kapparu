import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { environment } from 'src/environments/environment';
import { Merger } from 'src/app/services/merger';
import { MergerService } from 'src/app/services/merger.service';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
    selector: 'app-mergers-monitor',
    templateUrl: './mergers-monitor.component.html',
    styleUrls: ['./mergers-monitor.component.css'],
    standalone: false
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
    this.colMergersUpdateDate,
    { headerName: 'Target', field: 'targetTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'targetDescription', width: this.descriptionWidth },
    { headerName: 'Acquirer', field: 'acquirerTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'acquirerDescription', width: this.descriptionWidth },
    { headerName: 'Net', field: 'marketNetReturn', width: this.percentShortWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatterMerger},
    this.colMergersNetAnnualized,
    { headerName: 'Positive', field: 'marketPositiveReturn', width: this.percentShortWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatterMerger},
    { headerName: 'Annualized', field: 'marketPositiveReturnAnnualized', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatterMerger},
    { headerName: 'Confidence', field: 'confidence', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Close', field: 'closeDate', width: this.dateWidth, valueFormatter: this.dateFormatter },
    { headerName: '% Portfolio', field: 'percentPortfolio', width: this.percentWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Strike', field: 'strikeReturn', width: this.percentShortWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Annualized', field: 'strikeReturnAnnualized', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Return', field: 'positionReturn', width: this.percentShortWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Profit', field: 'profitLifetime', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  columnDefsTotal = [
    { headerName: 'ID', field: 'id', hide: true },
    { headerName: 'Date', field: 'date', width: this.dateWidth },
    { headerName: 'Target', field: 'targetTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'targetDescription', width: this.descriptionWidth },
    { headerName: 'Acquirer', field: 'acquirerTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'acquirerDescription', width: this.descriptionWidth },
    { headerName: 'Net', field: 'marketNetReturn', width: this.percentShortWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatterMerger},
    this.colMergersNetAnnualized,
    { headerName: 'Positive', field: 'marketPositiveReturn', width: this.percentShortWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatterMerger},
    { headerName: 'Annualized', field: 'marketPositiveReturnAnnualized', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatterMerger},
    { headerName: 'Confidence', field: 'confidence', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Close', field: 'closeDate', width: this.dateWidth },
    { headerName: '% Portfolio', field: 'percentPortfolio', width: this.percentWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Strike', field: 'strikeReturn', width: this.percentShortWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Annualized', field: 'strikeReturnAnnualized', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Return', field: 'positionReturn', width: this.percentShortWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Profit', field: 'profitLifetime', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  columnDefsWatch = [
    { headerName: 'ID', field: 'id', hide: true },
    this.colMergersUpdateDate,
    { headerName: 'Target', field: 'targetTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'targetDescription', width: this.descriptionWidth },
    { headerName: 'Acquirer', field: 'acquirerTicker', width: this.tickerWidth },
    { headerName: 'Description', field: 'acquirerDescription', width: this.descriptionWidth },
    { headerName: 'Net', field: 'marketNetReturn', width: this.percentShortWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatterMerger},
    this.colMergersNetAnnualized,
    { headerName: 'Positive', field: 'marketPositiveReturn', width: this.percentShortWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatterMerger},
    { headerName: 'Annualized', field: 'marketPositiveReturnAnnualized', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatterMerger},
    { headerName: 'Confidence', field: 'confidence', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Close', field: 'closeDate', width: this.dateWidth, valueFormatter: this.dateFormatter },
    { headerName: 'Status', field: 'status', width: this.tickerWidth },
    { headerName: 'Strike', field: 'strikeReturn', width: this.percentShortWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Annualized', field: 'strikeReturnAnnualized', width: this.percentWidth, cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Return', field: 'positionReturn', width: this.percentShortWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Profit', field: 'profitLifetime', width: this.valueWidth, cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ];

  constructor(private http: HttpClient, private router: Router, private mergerService: MergerService) {
    super()
  }

  ngOnInit() {
    this.positionsData = this.http.get(environment.api + 'blue-lion/gateway/enriched-mergers-positions');
    this.positionsTotalData = this.http.get(environment.api + 'blue-lion/gateway/enriched-mergers-positions-total');
    this.researchData = this.http.get(environment.api + 'blue-lion/gateway/enriched-mergers-research');
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
      active: true,
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
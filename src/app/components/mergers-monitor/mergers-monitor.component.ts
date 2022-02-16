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
  rowData: any;
  @Input() acquirerTicker: string;
  @Input() targetTicker: string;
  @Input() dealPrice: number;
  @Input() failPrice: number;
  @Input() announceDate: string;
  @Input() closeDate: string;
  @Input() confidence: number;
  @Input() dividends: number;

  columnDefs = [
    { headerName: 'ID', field: 'id', hide: true },
    { headerName: 'Target', field: 'targetTicker' },
    { headerName: 'Description', field: 'targetDescription' },
    { headerName: 'Acquirer', field: 'acquirerTicker' },
    { headerName: 'Description', field: 'acquirerDescription' },
    { headerName: 'Net', field: 'marketNetReturn', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    this.colMergersNetAnnualized,
    { headerName: 'Positive', field: 'marketPositiveReturn', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Annualized', field: 'marketPositiveReturnAnnualized', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Confidence', field: 'confidence', cellStyle: {textAlign: "right"}, valueFormatter: this.percentFormatter},
    { headerName: 'Close', field: 'closeDate', valueFormatter: this.dateFormatter },
  ];

  constructor(private http: HttpClient, private router: Router, private mergerService: MergerService) {
    super()
  }

  ngOnInit() {
    this.rowData = this.http.get('http://localhost:8081/blue-lion/read/enriched-mergers');
  }

  onRowDoubleClicked(params) {
    this.router.navigate(['/mergers-editor', { id: params.data.id } ]);
  }

  addMerger() {
		const that = this;
		this.mergerService.addMerger({
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
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { Merger, MergerJournal } from '../merger';
import * as moment from 'moment';
import { MergerService } from '../merger.service';

@Component({
  selector: 'app-mergers-editor',
  templateUrl: './mergers-editor.component.html',
  styleUrls: ['./mergers-editor.component.css']
})
export class MergersEditorComponent {

  id: string;
  rowData: any;
  mergerJournals: MergerJournal[] = [];

  // Inputs
  @Input() acquirerRefDataId: number;
  @Input() targetRefDataId: number;
  @Input() dealPrice: number;
  @Input() failPrice: number;
  @Input() breakPrice: number;
  @Input() announceDate: string;
  @Input() meetingDate: string;
  @Input() closeDate: string;
  @Input() breakDate: string;
  @Input() confidence: number;
  @Input() dividends: number;
  @Input() entry: string;

  columnDefs = [
    { headerName: 'ID', field: 'id', hide: true },
    { headerName: 'Target', field: 'targetTicker' },
    { headerName: 'Description', field: 'targetDescription' },
    { headerName: 'Acquirer', field: 'acquirerTicker' },
    { headerName: 'Description', field: 'acquirerDescription' },
    { headerName: 'Net', field: 'marketNetReturn', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
    { headerName: 'Annualized', field: 'marketNetReturnAnnualized', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
    { headerName: 'Positive', field: 'marketPositiveReturn', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
    { headerName: 'Annualized', field: 'marketPositiveReturnAnnualized', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
    { headerName: 'Confidence', field: 'confidence', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
    { headerName: 'Close', field: 'closeDate' },
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute, private mergerService: MergerService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.entry = ""
    this.rowData = this.http.get<Merger>('http://localhost:8081/blue-lion/read/enriched-mergers/' + this.id).pipe(
      map((receivedData: Merger) => {
        // Inputs
        this.confidence = receivedData.confidence;

        // Pass Thrus
        this.acquirerRefDataId = receivedData.acquirerRefDataId;
        this.targetRefDataId = receivedData.targetRefDataId;
        this.dealPrice = receivedData.dealPrice;
        this.failPrice = receivedData.failPrice;
        this.breakPrice = receivedData.breakPrice;
        this.announceDate = receivedData.announceDate;
        this.meetingDate = receivedData.meetingDate;
        this.closeDate = receivedData.closeDate;
        this.breakDate = receivedData.breakDate;
        this.dividends = receivedData.dividends;
        return Array.of(receivedData);
      }));
      this.http.get<MergerJournal[]>('http://localhost:8081/blue-lion/read/enriched-mergers-journal?mergerId=' + this.id).subscribe(
        mergerJournals => this.mergerJournals = mergerJournals
        );
  }

  onGridReady(params) {
    params.api.setHeaderHeight(25);
    var allColIds = params.columnApi.getAllColumns()
      .map(column => column.colId);
    params.columnApi.autoSizeColumns(allColIds);
  }

  onRowDataChanged(params) {
    this.onGridReady(params)
  }

  updateMerger() {
    const that = this;
    this.mergerService.updateMerger({
      id: +this.id,
      acquirerRefDataId: this.acquirerRefDataId,
      targetRefDataId: this.targetRefDataId,
      dealPrice: this.dealPrice,
      failPrice: this.failPrice,
      breakPrice: this.breakPrice,
      announceDate: this.announceDate,
      meetingDate: this.meetingDate,
      closeDate: this.closeDate,
      breakDate: this.breakDate,
      confidence: this.confidence,
      dividends: this.dividends,
    } as Merger).subscribe({
      next(m) {
        that.ngOnInit()
      }
    });
  }
  
  addMergerJournal() {
    const that = this;
    this.mergerService.addMergerJournal({
      mergerId: +this.id,
      entry: this.entry,
    } as MergerJournal).subscribe({
      next(m) {
        that.ngOnInit()
      }
    });
  }
}

function numberFormatter(params) {
  return params.value.toLocaleString();
}

function currencyFormatter(params) {
  return params.value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function percentFormatter(params) {
  return String((params.value * 100).toFixed(2)) + "%";
}

function percentIntFormatter(params) {
  return String((params.value * 100).toFixed(0)) + "%";
}

function dateFormatter(params) {
  return moment(params.value).format('YYYY-MM-DD');
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
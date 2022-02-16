import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { Merger, MergerJournal } from 'src/app/services/merger';
import * as moment from 'moment';
import { MergerService } from 'src/app/services/merger.service';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
  selector: 'app-mergers-editor',
  templateUrl: './mergers-editor.component.html',
  styleUrls: ['./mergers-editor.component.css']
})
export class MergersEditorComponent extends KapparuGridComponent {

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
    { headerName: 'Net', field: 'marketNetReturn', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    this.colMergersNetAnnualized,
    { headerName: 'Positive', field: 'marketPositiveReturn', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Annualized', field: 'marketPositiveReturnAnnualized', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Confidence', field: 'confidence', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
    { headerName: 'Close', field: 'closeDate', valueFormatter: this.dateFormatter },
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute, private mergerService: MergerService) {
    super()
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

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
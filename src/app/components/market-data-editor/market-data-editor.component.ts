import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';
import { MarketData } from 'src/app/services/market-data';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-market-data-editor',
  templateUrl: './market-data-editor.component.html',
  styleUrls: ['./market-data-editor.component.css']
})
export class MarketDataEditorComponent extends KapparuGridComponent {
  rowData: any;

  @Input() id: number;
  @Input() symbol = 'BKNG';
  @Input() refDataId: number;
  @Input() last: number;

  //@Input() ticker: string;
  columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'RefDataID', field: 'refDataId' },
    { headerName: 'Last', field: 'last' },
    { headerName: 'Stale', field: 'stale' },
  ]

  constructor(private http: HttpClient, private marketDataService: MarketDataService) {
    super()
  }

  ngOnInit() {
    this.rowData = this.http.get<MarketData>(environment.api + 'blue-lion/read/market-data?symbol=' + this.symbol).pipe(
      map((receivedData: MarketData) => {
        return Array.of(receivedData);
      }));
  }

  onEnter(value: string) {
    this.rowData = this.http.get<MarketData>(environment.api + 'blue-lion/read/market-data?symbol=' + value).pipe(
      map((marketData: MarketData) => {
        this.id = marketData.id;
        this.refDataId = marketData.refDataId;
        this.last = marketData.last;
        return Array.of(marketData);
      }));
  }

  updateMarketData() {
    const that = this;
    this.marketDataService.updateMarketData({
      id: this.id,
      refDataId: this.refDataId,
      last: this.last,
    } as MarketData).subscribe({
      next(m) {
        that.ngOnInit()
      }
    });
  }

  addMarketData() {
    const that = this;
    this.marketDataService.addMarketData({
      id: 0,
      refDataId: this.refDataId,
      last: this.last,
    } as MarketData).subscribe({
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
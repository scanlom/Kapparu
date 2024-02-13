import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';
import { RefData } from 'src/app/services/ref-data';
import { RefDataService } from 'src/app/services/ref-data.service';

@Component({
  selector: 'app-ref-data-editor',
  templateUrl: './ref-data-editor.component.html',
  styleUrls: ['./ref-data-editor.component.css']
})
export class RefDataEditorComponent extends KapparuGridComponent {
  rowData: any;

  @Input() id: number;
  @Input() symbol = 'BKNG';
  @Input() symbolAlphaVantage: string;
  @Input() description: string;
  @Input() industry: string;
  @Input() sector: string;
  @Input() active: boolean;

  //@Input() ticker: string;
  columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'SymbolAlphaVantage', field: 'symbolAlphaVantage' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Sector', field: 'sector' },
    { headerName: 'Industry', field: 'industry' },
    { headerName: 'Active', field: 'active' },
  ]

  constructor(private http: HttpClient, private refDataService: RefDataService) {
    super()
  }

  ngOnInit() {
    this.rowData = this.http.get<RefData>(environment.api + '8081/blue-lion/read/ref-data?symbol=' + this.symbol).pipe(
      map((receivedData: RefData) => {
        return Array.of(receivedData);
      }));
  }

  onEnter(value: string) {
    this.rowData = this.http.get<RefData>(environment.api + '8081/blue-lion/read/ref-data?symbol=' + value).pipe(
      map((refData: RefData) => {
        this.id = refData.id;
        this.symbol = refData.symbol;
        this.symbolAlphaVantage = refData.symbolAlphaVantage;
        this.description = refData.description;
        this.sector = refData.sector;
        this.industry = refData.industry;
        this.active = refData.active;
        return Array.of(refData);
      }));
  }

  updateRefData() {
    const that = this;
    this.refDataService.updateRefData({
      id: this.id,
      symbol: this.symbol,
      symbolAlphaVantage: this.symbolAlphaVantage,
      description: this.description,
      sector: this.sector,
      industry: this.industry,
      active: this.active,
    } as RefData).subscribe({
      next(m) {
        that.ngOnInit()
      }
    });
  }

  addRefData() {
    const that = this;
    this.refDataService.addRefData({
      id: 0,
      symbol: this.symbol,
      symbolAlphaVantage: this.symbolAlphaVantage,
      description: this.description,
      sector: this.sector,
      industry: this.industry,
      active: this.active,
    } as RefData).subscribe({
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
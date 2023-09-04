import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';
import { Position } from 'src/app/services/position';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-position-editor',
  templateUrl: './position-editor.component.html',
  styleUrls: ['./position-editor.component.css']
})
export class PositionEditorComponent extends KapparuGridComponent {
  rowData: any;

  @Input() id: number;
  @Input() active: boolean;
  @Input() refDataId: number;
  @Input() portfolioId: number;
  @Input() value: number;
  @Input() model: number;
  position: Position;

  columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Active', field: 'active' },
    { headerName: 'Portfolio', field: 'portfolioId', width: this.tickerWidth, valueFormatter: this.portfolioIdFormatter },    
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Value', field: 'value', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
  ]

  constructor(private http: HttpClient, private positionService: PositionService) {
    super()
  }

  ngOnInit() {
    this.active = true;
    if (this.id > 0) {
      this.rowData = this.http.get<Position>('http://localhost:8081/blue-lion/read/positions/' + this.id).pipe(
        map((receivedData: Position) => {
          return Array.of(receivedData);
        }));
    }
  }

  onEnter(value: number) {
    this.rowData = this.http.get<Position>('http://localhost:8081/blue-lion/read/positions/' + value).pipe(
      map((position: Position) => {
        this.id = position.id;
        this.active = position.active;
        this.refDataId = position.refDataId;
        this.portfolioId = position.portfolioId;
        this.value = position.value;
        this.model = position.model;
        this.position = position;
        return Array.of(position);
      }));
  }

  updatePosition() {
    const that = this;
    this.position.active = this.active;
    this.position.value = this.value;
    this.position.model = this.model;
    this.positionService.updatePosition(this.position).subscribe({
      next(m) {
        that.ngOnInit()
      }
    });
  }

  addPosition() {
    const that = this;
    this.positionService.addPosition({
      id: 0,
      refDataId: this.refDataId,
      portfolioId: this.portfolioId,
      quantity: 0,
      price: 0,
      value: 0,
      index: 0,
      divisor: 0,
      costBasis: 0,
      totalCashInfusion: 0,
      accumulatedDividends: 0,
      model: this.model,
      pricingType: 1,
      active: this.active,
    } as Position).subscribe({
      next(p) {
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
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
  @Input() value: number;
  position: Position;

  columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Value', field: 'value' },
  ]

  constructor(private http: HttpClient, private positionService: PositionService) {
    super()
  }

  ngOnInit() {
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
        this.value = position.value;
        this.position = position;
        return Array.of(position);
      }));
  }

  updatePosition() {
    const that = this;
    this.position.value = this.value
    this.positionService.updatePosition(this.position).subscribe({
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
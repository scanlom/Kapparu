import { Component, Input, OnChanges, SimpleChanges	} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

import { Projections } from '../projections';
import { ProjectionsService } from '../projections.service';

@Component({
  selector: 'app-projections-editor',
  templateUrl: './projections-editor.component.html',
  styleUrls: ['./projections-editor.component.css']
})
export class ProjectionsEditorComponent implements OnChanges {
  @Input() rowData: any;
  @Input() refDataId: number;
  @Input() date: string;
  @Input() eps: number;
  @Input() dps: number;
  @Input() growth: number;
  @Input() peTerminal: number;
  @Input() payout: number;
  @Input() book: number;
  @Input() roe: number;
  @Input() epsYr1: number;
  @Input() epsYr2: number;

  constructor(private projectionsService: ProjectionsService) {
	console.log(this.projectionsService); // It is defined
 }

  ngOnChanges(changes: SimpleChanges) {
	if (changes.rowData && changes.rowData.currentValue) {
		this.refDataId = this.rowData[0].refDataId;
		this.date = moment().format("YYYY-MM-DD");
		if (this.rowData[0].entryType == "O") {
			this.eps = this.rowData[0].eps;
			this.dps = this.rowData[0].dps;
			this.growth = this.rowData[0].growth;
			this.peTerminal = this.rowData[0].peTerminal;
			this.payout = this.rowData[0].payout;
			this.book = this.rowData[0].book;
			this.roe = this.rowData[0].roe;
			this.epsYr1 = this.rowData[0].epsYr1;
			this.epsYr2 = this.rowData[0].epsYr2;
		}
		else {
			this.eps = null;
			this.dps = null;
			this.growth = null;
			this.peTerminal = null;
			this.payout = null;
			this.book = null;
			this.roe = null;
			this.epsYr1 = null;
			this.epsYr2 = null;
		}
	}
  }

  addProjections() {
	console.log(this.refDataId)
    this.projectionsService.addProjections({
	  refDataId: this.refDataId,
	  date: this.date,
	  eps: this.eps,
	  dps: this.dps,
	  growth: this.growth,
	  peTerminal: this.peTerminal,
	  payout: this.payout,
	  book: this.book,
	  roe: this.roe,
	  epsYr1: this.epsYr1,
	  epsYr2: this.epsYr2,
    } as Projections).subscribe();
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
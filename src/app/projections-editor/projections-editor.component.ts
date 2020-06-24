import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Projections } from '../projections';
import { ProjectionsService } from '../projections.service';

@Component({
  selector: 'app-projections-editor',
  templateUrl: './projections-editor.component.html',
  styleUrls: ['./projections-editor.component.css']
})
export class ProjectionsEditorComponent {
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
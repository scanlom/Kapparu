import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefDataEditorComponent } from 'src/app/components/ref-data-editor/ref-data-editor.component';
import { MarketDataEditorComponent } from 'src/app/components/market-data-editor/market-data-editor.component';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css']
})
export class AdminEditorComponent {
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
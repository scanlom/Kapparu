import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

import { Projections, ProjectionsJournal } from '../projections';
import { ProjectionsService } from '../projections.service';

@Component({
	selector: 'app-projections-editor',
	templateUrl: './projections-editor.component.html',
	styleUrls: ['./projections-editor.component.css']
})
export class ProjectionsEditorComponent implements OnChanges {
	projectionsJournals: ProjectionsJournal[] = [];

	@Input() id: number;
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
	@Input() confidence: string;
	@Input() entry: string;

	@Output() changedEvent = new EventEmitter();

	columnDefs = [
		{ headerName: 'Date', field: 'date', valueFormatter: dateFormatter },
		{ headerName: 'EPS', field: 'eps', cellStyle: { textAlign: "right" }, valueFormatter: currencyFormatter },
		{ headerName: 'DPS', field: 'dps', cellStyle: { textAlign: "right" }, valueFormatter: currencyFormatter },
		{ headerName: 'Growth', field: 'growth', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
		{ headerName: 'PETerminal', field: 'peTerminal', cellStyle: { textAlign: "right" }, valueFormatter: numberFormatter },
		{ headerName: 'Payout', field: 'payout', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
		{ headerName: 'Book', field: 'book', cellStyle: { textAlign: "right" }, valueFormatter: currencyFormatter },
		{ headerName: 'ROE', field: 'roe', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
		{ headerName: 'EPSYr1', field: 'epsYr1', cellStyle: { textAlign: "right" }, valueFormatter: currencyFormatter },
		{ headerName: 'EPSYr2', field: 'epsYr2', cellStyle: { textAlign: "right" }, valueFormatter: currencyFormatter },
		{
			headerName: 'Confidence', field: 'confidence', cellStyle: params => {
				switch (params.value) {
					case 'H':
						return { backgroundColor: 'green' };
					case 'M':
						return { backgroundColor: 'yellow' };
					case 'B':
						return { backgroundColor: 'gray' };
					case 'L':
						return { backgroundColor: 'red' };
				}
				return null;
			}
		},
		{ headerName: 'Price', field: 'price', cellStyle: { textAlign: "right" }, valueFormatter: currencyFormatter },
		{ headerName: 'PE', field: 'pe', cellStyle: { textAlign: "right" }, valueFormatter: currencyFormatter },
		{ headerName: 'EPSYield', field: 'epsYield', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
		{ headerName: 'DPSYield', field: 'dpsYield', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
		{ headerName: 'CAGR5yr', field: 'cagr5yr', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
		{ headerName: 'CAGR10yr', field: 'cagr10yr', cellStyle: { textAlign: "right" }, valueFormatter: percentFormatter },
		{ headerName: 'Magic', field: 'magic', cellStyle: { textAlign: "right" }, valueFormatter: currencyFormatter, headerTooltip: 'cagr5yr' },
	]

	constructor(private http: HttpClient, private projectionsService: ProjectionsService) {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.rowData && changes.rowData.currentValue) {
			this.id = this.rowData[0].id
			this.refDataId = this.rowData[0].refDataId;
			this.date = moment().format("YYYY-MM-DD");
			this.eps = this.rowData[0].eps;
			this.dps = this.rowData[0].dps;
			this.growth = this.rowData[0].growth;
			this.peTerminal = this.rowData[0].peTerminal;
			this.payout = this.rowData[0].payout;
			this.book = this.rowData[0].book;
			this.roe = this.rowData[0].roe;
			this.epsYr1 = this.rowData[0].epsYr1;
			this.epsYr2 = this.rowData[0].epsYr2;
			this.confidence = this.rowData[0].confidence;

			this.http.get<ProjectionsJournal[]>('http://localhost:8081/blue-lion/read/enriched-projections-journal?projectionsId=' + this.id).subscribe(
				projectionsJournals => this.projectionsJournals = projectionsJournals
			);
		}
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

	addProjections() {
		console.log(this.refDataId)
		const that = this;
		if (this.id == 0) {
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
				confidence: this.confidence,
			} as Projections).subscribe({
				next(m) {
					that.changedEvent.emit();
				}
			});
		} else {
			this.projectionsService.updateProjections({
				id: this.id,
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
				confidence: this.confidence,
			} as Projections).subscribe({
				next(m) {
					that.changedEvent.emit();
				}
			});
		}
	}

	addProjectionsJournal() {
		const that = this;
		this.projectionsService.addProjectionsJournal({
			projectionsId: +this.id,
			entry: this.entry,
		} as ProjectionsJournal).subscribe({
			next(m) {
				that.changedEvent.emit();
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
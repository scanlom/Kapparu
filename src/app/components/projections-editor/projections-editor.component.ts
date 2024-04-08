import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Projections, ProjectionsJournal } from 'src/app/services/projections';
import { ProjectionsService } from 'src/app/services/projections.service';
import { KapparuGridComponent } from 'src/app/shared/kapparu-grid/kapparu-grid.component';

@Component({
	selector: 'app-projections-editor',
	templateUrl: './projections-editor.component.html',
	styleUrls: ['./projections-editor.component.css']
})
export class ProjectionsEditorComponent extends KapparuGridComponent implements OnChanges {
	projectionsJournals: ProjectionsJournal[] = [];

	@Input() projectionsJournalId: number = 0;
	@Input() entry: string = "";
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
	@Input() watch: boolean;

	@Output() changedEvent = new EventEmitter();

	columnDefs = [
		this.colDate,
		{ headerName: 'EPS', field: 'eps', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
		{ headerName: 'DPS', field: 'dps', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
		{ headerName: 'Growth', field: 'growth', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
		{ headerName: 'PETerminal', field: 'peTerminal', cellStyle: { textAlign: "right" }, valueFormatter: this.numberFormatter },
		{ headerName: 'Payout', field: 'payout', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
		{ headerName: 'Book', field: 'book', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
		{ headerName: 'ROE', field: 'roe', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
		{ headerName: 'EPSYr1', field: 'epsYr1', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
		{ headerName: 'EPSYr2', field: 'epsYr2', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
		this.colConfidence,
		{ headerName: 'Price', field: 'price', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
		{ headerName: 'PE', field: 'pe', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter },
		{ headerName: 'EPSYield', field: 'epsYield', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
		{ headerName: 'DPSYield', field: 'dpsYield', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
		this.colCAGR5yr,
		{ headerName: 'CAGR10yr', field: 'cagr10yr', cellStyle: { textAlign: "right" }, valueFormatter: this.percentFormatter },
		{ headerName: 'Magic', field: 'magic', cellStyle: { textAlign: "right" }, valueFormatter: this.currencyFormatter, headerTooltip: 'cagr5yr' },
	]

	constructor(private http: HttpClient, private projectionsService: ProjectionsService) {
		super()
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.rowData && changes.rowData.currentValue) {
			this.id = this.rowData[0].id;
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
			this.watch = this.rowData[0].watch;

			this.http.get<ProjectionsJournal[]>(environment.api + 'blue-lion/read/enriched-projections-journal?projectionsId=' + this.id).subscribe(
				projectionsJournals => this.projectionsJournals = projectionsJournals
			);
		}
	}

	addProjections() {
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
				watch: this.watch,
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
				watch: this.watch,
			} as Projections).subscribe({
				next(m) {
					that.changedEvent.emit();
				}
			});
		}
	}

	addProjectionsJournal() {
		const that = this;
		if (this.projectionsJournalId == 0) {
			this.projectionsService.addProjectionsJournal({
				projectionsId: +this.id,
				date: this.date,
				entry: this.entry,
			} as ProjectionsJournal).subscribe({
				next(m) {
					that.clearProjectionsJournal();
					that.changedEvent.emit();
				}
			});
		} else {
			this.projectionsService.updateProjectionsJournal({
				id: this.projectionsJournalId,
				entry: this.entry,
			} as ProjectionsJournal).subscribe({
				next(m) {
					that.clearProjectionsJournal();
					that.changedEvent.emit();
				}
			});
		}
	}

	deleteProjectionsJournal(projectionsJournal: ProjectionsJournal) {
		const that = this;
		this.projectionsService.deleteProjectionsJournal({
			id: projectionsJournal.id,
		} as ProjectionsJournal).subscribe({
			next(m) {
				that.changedEvent.emit();
			}
		});
	}

	editProjectionsJournal(projectionsJournal: ProjectionsJournal) {
		// This is not a server txn, we're just updating the ui edit box
		this.entry = projectionsJournal.entry
		this.projectionsJournalId = projectionsJournal.id
	}

	clearProjectionsJournal() {
		// This is not a server txn, we're just updating the ui edit box
		this.entry = ""
		this.projectionsJournalId = 0
	}
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
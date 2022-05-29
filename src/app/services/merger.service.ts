import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Merger, MergerJournal } from './merger';

@Injectable({ providedIn: 'root' })
export class MergerService {

  private mergerUrl = 'http://localhost:8083/blue-lion/write/mergers/';
  private enrichedMergerUrl = 'http://localhost:8083/blue-lion/write/enriched-mergers';
  private mergerJournalUrl = 'http://localhost:8083/blue-lion/write/enriched-mergers-journal';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
	){}
	
  /** PUT: update a merger on the server */
  updateMerger(merger: Merger): Observable<Merger> {
    return this.http.put<Merger>(this.mergerUrl + merger.id, merger, this.httpOptions).pipe(
      tap((newMerger: Merger) => this.log(`updated merger w/ id=${newMerger.id}`)),
      catchError(this.handleError<Merger>('updateMerger'))
    );
  }

  /** POST: add a merger on the server */
  addMerger(merger: Merger): Observable<Merger> {
    return this.http.post<Merger>(this.enrichedMergerUrl, merger, this.httpOptions).pipe(
      tap((newMerger: Merger) => this.log(`added merger w/ id=${newMerger.id}`)),
      catchError(this.handleError<Merger>('addMerger'))
    );
  }

  /** POST: add a merger journal on the server */
  addMergerJournal(mergerJournal: MergerJournal): Observable<MergerJournal> {
    return this.http.post<MergerJournal>(this.mergerJournalUrl, mergerJournal, this.httpOptions).pipe(
      tap((newMergerJournal: MergerJournal) => this.log(`added merger journal w/ id=${newMergerJournal.id}`)),
      catchError(this.handleError<MergerJournal>('addMergerJournal'))
    );
  }

  /** PUT: update merger journal on the server */
  updateMergerJournal(mergerJournal: MergerJournal): Observable<MergerJournal> {
    return this.http.put<MergerJournal>(this.mergerJournalUrl + "/" + mergerJournal.id, mergerJournal, this.httpOptions).pipe(
      tap((newMergerJournal: MergerJournal) => this.log(`updated Merger journal w/ id=${newMergerJournal.id}`)),
      catchError(this.handleError<MergerJournal>('updateMergerJournal'))
    );
  }

  /** DELETE: delete a merger journal on the server */
  deleteMergerJournal(mergerJournal: MergerJournal): Observable<MergerJournal> {
    return this.http.delete<MergerJournal>(this.mergerJournalUrl + "/" + mergerJournal.id).pipe(
      tap(() => this.log(`deleted Merger journal`)),
      catchError(this.handleError<MergerJournal>('deleteMergerJournal'))
    );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a MergerService message*/
  private log(message: string) {
    console.log(`MergerService: ${message}`);
  }
}
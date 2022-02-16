import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { RefData } from './ref-data';

@Injectable({ providedIn: 'root' })
export class RefDataService {

  private refDataUrl = 'http://localhost:8083/blue-lion/write/ref-data';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  /** PUT: update ref data on the server */
  updateRefData(refData: RefData): Observable<RefData> {
    console.log(refData)
    return this.http.put<RefData>(this.refDataUrl + "/" + refData.id, refData, this.httpOptions).pipe(
      tap((newRefData: RefData) => this.log(`updated ref data w/ id=${newRefData.id}`)),
      catchError(this.handleError<RefData>('updateRefData'))
    );
  }

    /** POST: add a merger journal on the server */
    addRefData(refData: RefData): Observable<RefData> {
      return this.http.post<RefData>(this.refDataUrl, refData, this.httpOptions).pipe(
        tap((newRefData: RefData) => this.log(`added ref data w/ id=${newRefData.id}`)),
        catchError(this.handleError<RefData>('addRefData'))
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

  /** Log a RefDataService message*/
  private log(message: string) {
    console.log(`RefDataService: ${message}`);
  }
}
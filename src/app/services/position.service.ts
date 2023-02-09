import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Position } from './position';

@Injectable({ providedIn: 'root' })
export class PositionService {

  private positionUrl = 'http://localhost:8083/blue-lion/write/positions';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  /** PUT: update position on the server */
  updatePosition(position: Position): Observable<Position> {
    console.log(position)
    return this.http.put<Position>(this.positionUrl + "/" + position.id, position, this.httpOptions).pipe(
      tap((newPosition: Position) => this.log(`updated position w/ id=${newPosition.id}`)),
      catchError(this.handleError<Position>('updatePosition'))
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
    console.log(`PositionService: ${message}`);
  }
}
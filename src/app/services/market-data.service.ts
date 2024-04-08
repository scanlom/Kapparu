import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MarketData } from './market-data';

@Injectable({ providedIn: 'root' })
export class MarketDataService {

  private marketDataUrl = environment.api + 'blue-lion/write/market-data';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  /** PUT: update market data on the server */
  updateMarketData(marketData: MarketData): Observable<MarketData> {
    return this.http.put<MarketData>(this.marketDataUrl + "/" + marketData.id, marketData, this.httpOptions).pipe(
      tap((newMarketData: MarketData) => this.log(`updated market data w/ id=${newMarketData.id}`)),
      catchError(this.handleError<MarketData>('updateMarketData'))
    );
  }

    /** POST: add market data on the server */
    addMarketData(marketData: MarketData): Observable<MarketData> {
      return this.http.post<MarketData>(this.marketDataUrl, marketData, this.httpOptions).pipe(
        tap((newMarketData: MarketData) => this.log(`added market data w/ id=${newMarketData.id}`)),
        catchError(this.handleError<MarketData>('addMarketData'))
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
    console.log(`MarketDataService: ${message}`);
  }
}
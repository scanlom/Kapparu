import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Transaction } from './transaction';

@Injectable({ providedIn: 'root' })
export class TransactionService {

  private transactionUrl = environment.api + '8085/blue-lion/run/execute-book-transaction';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
	){}
	
  /** POST: add a merger on the server */
  bookTransaction(txn: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionUrl, txn, this.httpOptions).pipe(
      tap((newTxn: Transaction) => this.log(`booked transaction`)),
      catchError(this.handleError<Transaction>('addMerger'))
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

  /** Log a TransactionService message*/
  private log(message: string) {
    console.log(`TransactionService: ${message}`);
  }
}
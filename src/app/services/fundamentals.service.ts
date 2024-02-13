import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Income } from './fundamentals';
import { Balance } from './fundamentals';
import { Cashflow } from './fundamentals';

@Injectable({ providedIn: 'root' })
export class FundamentalsService {

  private incomeUrl = environment.api + '8083/blue-lion/write/simfin-income';
  private balanceUrl = environment.api + '8083/blue-lion/write/simfin-balance';
  private cashflowUrl = environment.api + '8083/blue-lion/write/simfin-cashflow';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
	){}
	
  /** POST: add a new income to the server */
  addIncome(income: Income): Observable<Income> {
	console.log(income); // It is defined
    return this.http.post<Income>(this.incomeUrl, income, this.httpOptions).pipe(
      tap((newIncome: Income) => this.log(`added income w/ id=${newIncome.id}`)),
      catchError(this.handleError<Income>('addIncome'))
    );
  }

  /** POST: add a new balance to the server */
  addBalance(balance: Balance): Observable<Balance> {
	console.log("addBalance called"); // It is defined
    return this.http.post<Balance>(this.balanceUrl, balance, this.httpOptions).pipe(
      tap((newBalance: Balance) => this.log(`added balance w/ id=${newBalance.id}`)),
      catchError(this.handleError<Balance>('addBalance'))
    );
  }

  /** POST: add a new cashflow to the server */
  addCashflow(cashflow: Cashflow): Observable<Cashflow> {
	console.log("addCashflow called"); // It is defined
    return this.http.post<Cashflow>(this.cashflowUrl, cashflow, this.httpOptions).pipe(
      tap((newCashflow: Cashflow) => this.log(`added cashflow w/ id=${newCashflow.id}`)),
      catchError(this.handleError<Cashflow>('addCashflow'))
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

  /** Log a FundamentalsService message*/
  private log(message: string) {
    console.log(`FundamentalsService: ${message}`);
  }
}
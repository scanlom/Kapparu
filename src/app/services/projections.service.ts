import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Projections, ProjectionsJournal } from './projections';

@Injectable({ providedIn: 'root' })
export class ProjectionsService {

  private projectionsUrl = environment.api + '8083/blue-lion/write/projections';
  private projectionsJournalUrl = environment.api + '8083/blue-lion/write/enriched-projections-journal';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  /** POST: add new projections to the server */
  addProjections(projections: Projections): Observable<Projections> {
    return this.http.post<Projections>(this.projectionsUrl, projections, this.httpOptions).pipe(
      tap((newProjections: Projections) => this.log(`added projections w/ id=${newProjections.id}`)),
      catchError(this.handleError<Projections>('addProjections'))
    );
  }
  
  /** PUT: update projections on the server */
  updateProjections(projections: Projections): Observable<Projections> {
    return this.http.put<Projections>(this.projectionsUrl + "/" + projections.id, projections, this.httpOptions).pipe(
      tap((newProjections: Projections) => this.log(`updated projections w/ id=${newProjections.id}`)),
      catchError(this.handleError<Projections>('updateProjections'))
    );
  }

  /** POST: add a projections journal on the server */
  addProjectionsJournal(projectionsJournal: ProjectionsJournal): Observable<ProjectionsJournal> {
    return this.http.post<ProjectionsJournal>(this.projectionsJournalUrl, projectionsJournal, this.httpOptions).pipe(
      tap((newProjectionsJournal: ProjectionsJournal) => this.log(`added projections journal w/ id=${newProjectionsJournal.id}`)),
      catchError(this.handleError<ProjectionsJournal>('addProjectionsJournal'))
    );
  }

  /** PUT: update projections journal on the server */
  updateProjectionsJournal(projectionsJournal: ProjectionsJournal): Observable<ProjectionsJournal> {
    return this.http.put<ProjectionsJournal>(this.projectionsJournalUrl + "/" + projectionsJournal.id, projectionsJournal, this.httpOptions).pipe(
      tap((newProjectionsJournal: ProjectionsJournal) => this.log(`updated projections journal w/ id=${newProjectionsJournal.id}`)),
      catchError(this.handleError<ProjectionsJournal>('updateProjectionsJournal'))
    );
  }

  /** DELETE: delete a projections journal on the server */
  deleteProjectionsJournal(projectionsJournal: ProjectionsJournal): Observable<ProjectionsJournal> {
    return this.http.delete<ProjectionsJournal>(this.projectionsJournalUrl + "/" + projectionsJournal.id).pipe(
      tap(() => this.log(`deleted projections journal`)),
      catchError(this.handleError<ProjectionsJournal>('deleteProjectionsJournal'))
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

  /** Log a ProjectionsService message*/
  private log(message: string) {
    console.log(`ProjectionsService: ${message}`);
  }
}
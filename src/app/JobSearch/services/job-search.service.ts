import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Jobsfeed } from '../job-search-pojo/Jobsfeed';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  private JobsFeedUrl = 'https://api.myjson.com/bins/kez8a';  // URL to web api

  constructor(
    private http: HttpClient, private messageService: MessageService) { }


  /** GET Jobs feed from the server */
  getJobsFeed(): Observable<Jobsfeed[]> {
    return this.http.get<Jobsfeed[]>(this.JobsFeedUrl)
      .pipe(
        tap(_ => this.log('fetched JobsFeed')),
        catchError(this.handleError('JobsFeed', []))
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



  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DiscussService {

  constructor(
    private http: HttpClient
  ) { }

  getMessage(personId: any): Observable<any>{
    const options = personId ? {params : new HttpParams().set('getmessage', personId)} : {};
    return this.http.get('http://127.0.0.1:4500/getmessage', options)
      .pipe(
        catchError(this.handleError)
      )
  }

  getSerchResult(searchVal: string):Observable<any>{
    return this.http.post('http://127.0.0.1:4500/search_discuss_sidenav', searchVal)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  //Error Handle
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

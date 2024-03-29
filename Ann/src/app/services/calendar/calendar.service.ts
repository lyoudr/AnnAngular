import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  
  public memorandumlists: Array<any> = [];

  constructor(
    private http: HttpClient,
  ) { }


  // get memorandum of each month
  getTodolist(month: string, user: string){
    const gettodooptions = {
      params : new HttpParams()
        .set('month', month)
        .set('user', user)
    }
    return this.http.get('http://127.0.0.1:4500/getcalendar', gettodooptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  // post memorandum to server
  postTodolists(memorandum : any){
    console.log('memorandum is =>', memorandum);
    return this.http.post('http://127.0.0.1:4500/postcalendar', memorandum)
      .pipe(
        catchError(this.handleError)
      )
  }

  // get memorandum detail
  getTodolistDetail(user: string, month: string, date: any, Id : string){
    const getTodoInfo = {
      user: user,
      month: month,
      date : date,
      Id : Id
    };
    return this.http.post('http://127.0.0.1:4500/getmemorandumdetail', getTodoInfo)
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

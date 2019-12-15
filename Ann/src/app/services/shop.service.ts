import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
  constructor(
    private http: HttpClient
  ) { }

  getpopularCommodities(): Observable<any>{
    const getcommoditesOptions = {
      headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.get('http://127.0.0.1:4500/popularItems', getcommoditesOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getcommditiesPhoto(): Observable<any>{
    return this.http.get('http://127.0.0.1:4500/popularItemsPhoto')
      .pipe(
        catchError(this.handleError)
      )
  }

  getcommdityDetail(itemId): Observable<any> {
    console.log('itemId is =>', itemId);
    const getcommdityOptions = {
      params : new HttpParams()
        .set('itemId', itemId)
    }
    return this.http.get('http://127.0.0.1:4500/getcommditydetail', getcommdityOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  /* Error handling */
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
      console.log('error.status is =>', error.status);
    } 
    // return an observable with a user-facing error message
    return  throwError(`${error.status}`);
  };
}
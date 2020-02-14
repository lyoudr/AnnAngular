import { Injectable } from '@angular/core';
import { 
  HttpClient, 
  HttpHeaders, 
  HttpErrorResponse, 
  HttpParams
} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  /*1. Get restaurant lists */
  Getrestaurant(pagenumber, classification){
    const getrestaurantOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.get<Object>(`http://127.0.0.1:4500/restaurantlists/?page=${pagenumber}&classification=${classification}`, getrestaurantOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  /*2. Get Post */
  GetPost(restaurantId: any) : Observable<any>{
    const options = restaurantId ? {params: new HttpParams().set('restaurantId', restaurantId)} : {};
    return this.http.get<Object>('http://127.0.0.1:4500/restaurantpost', options)
      .pipe(
        catchError(this.handleError)
      )
  }

  /*3. Search Restaurant */
  searchFood(food : string):Observable<any>{
    return this.http.post<Object>('http://127.0.0.1:4500/searchfood', food)
      .pipe(
        catchError(this.handleError)
      )
  }
  /*4. Get comment when enter to this page */
  getComment(restaurantId: string): Observable<any>{
    const options2 = restaurantId ? {params: new HttpParams().set('restaurantId', restaurantId)} : {};
    return this.http.get('http://127.0.0.1:4500/getcomment', options2)
      .pipe(
        catchError(this.handleError)
      )
  }
  /*5. Sent comment of each restaurant to server */
  sentComment(comment : any) : Observable<any>{
    return this.http.post('http://127.0.0.1:4500/restaurantcomment', comment)
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
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PianoService {

  isDetail : boolean = false; // decide if is enter to detail page
  
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getsheet(sheettype: any){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    sheettype = sheettype.trim();
    return this.http.get('http://127.0.0.1:4500/getsheet', {
      headers: headers, 
      responseType: 'blob', 
      params: new HttpParams().set('sheettype', sheettype)
    })
      .pipe(
        catchError(this.handleError)
      )
  }

  getmusicsheet(musictype: string){
    const options = {
      params : new HttpParams().set('musictype', musictype)
    }
    console.log('options is =>', options);
    return this.http.get('http://127.0.0.1:4500/getmusicsheet', options)
      .pipe(
        catchError(this.handleError)
      )
  }
  // detect navigation
  detectNavigation(url){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        if(event.url !== url){
          this.isDetail = true;
        } else if(event.url === url){
          this.isDetail = false;
        }
      }
    });
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  postlist: any[] = [
    {date: '19/02/28', title: 'Yogurt Swirl Smoothie Bowl', url: 'post/yogurt', content:''},
    {date: '19/02/22', title: 'Baked Vegan Cheesecake', url: 'post/baked', content:''},
    {date: '19/02/28', title: 'Immune System Juicel', url: 'post/immune', content:''},
    {date: '19/01/15', title: 'Nature Inspired Smoothie', url: 'post/nature', content:''},
    {date: '19/01/05', title: 'Programming Learning', url: 'post/program', content:''},
    {date: '18/12/28', title: 'Butter Chicken', url: 'post/butter', content:''},
    {date: '18/11/15', title: 'Rogan Josh', url: 'post/rogan', content:''},
    {date: '18/11/05', title: 'Samosas', url: 'post/samosas', content:''},
    {date: '18/10/23', title: 'Tandoori Chicken', url: 'post/tandoori', content:''},
    {date: '18/09/25', title: 'Malai Kofta', url: 'post/malai', content:''},
  ]

  httpOptions:any = {}

  // Add New Post
  blogPost(content: any): Observable<any>{
    return this.http.post(`http://127.0.0.1:4500/blogpost`, content, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get Post content
  getPosts(postId: any){
    postId = postId.trim();
    const options = postId? {params: new HttpParams().set('postId', postId)} : {};
    return this.http.get('http://127.0.0.1:4500/getpost', options)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Upload Image
  postFile(file : File):Observable<any>{
    const formData : FormData = new FormData();
    formData.append('filekey', file, file.name);
    return this.http.post('http://127.0.0.1:4500/postFile', formData)
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


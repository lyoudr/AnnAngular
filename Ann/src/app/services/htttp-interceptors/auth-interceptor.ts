import { AuthService } from '../auth-service/auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private cookieService : CookieService
    ){}

    intercept(req: HttpRequest<any>, next : HttpHandler){
        // Get the auth token from the service.
        const authToken = this.cookieService.get('AccessToken');

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization
        const authReq = req.clone({
            headers: req.headers.set('Authorization' ,authToken)
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}
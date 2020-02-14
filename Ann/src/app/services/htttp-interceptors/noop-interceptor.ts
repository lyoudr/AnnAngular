/* Intercepting requests and response */
// Interceptors can perform a variety of implicit tasks, from authentication to logging, in a routine, standard way, for every HTTP request/response.

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/* Pass untouched request through to the next request handler. */
@Injectable()

export class NoopInterceptor implements HttpInterceptor {
    // The intercept method transforms a request into an Observable that eventually returns the HTTP response.
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        // Typescript disallows the following assignment because req.url is readonly
        // req.url = req.url.replace('http://', 'https://');

        // clone request and replace 'http://' with 'https://' at the same time
        const secureReq = req.clone({
            url: req.url.replace('http://', 'https://')
        });
        // send the cloned, "secure" request to the next handler.
        return next.handle(secureReq);
    }
}
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheMapService } from './catchservice/cache-map.service';


@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: CacheMapService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // if reqest method is not "GET", do not cache
        if (!this.isRequestCachable(req)) { 
           return next.handle(req); 
        }
        // if request method is "GET" and this request is not expired, return the cached response cached previously.
        const cachedResponse = this.cache.get(req);
        console.log('cahedResponse is =>', cachedResponse);
        if (cachedResponse !== null) {
           return of(cachedResponse);
        }
        // if request method is "GET", but is expired. Recache this request, and store its response and cache time in cacheMap. 
        return next.handle(req).pipe(
           tap(event => {
              if (event instanceof HttpResponse) {
                this.cache.put(req, event); 
              }
           })
        );
   }
   private isRequestCachable(req: HttpRequest<any>) {
      return req.method === 'GET';
   }
} 
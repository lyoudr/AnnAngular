/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthInterceptor } from './auth-interceptor'; // add authorization to each request header
import { CachingInterceptor } from './catch-interceptor';


/* Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true}
]

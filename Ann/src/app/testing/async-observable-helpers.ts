import { defer } from 'rxjs';

/* Create async observable that emits-once and completes after a JS engine turn */

// The RxJS defer() operator returns an observable. It takes a a factory function that returns either a promise or an observable.
// When something subscribes to defer's observable, it adds the subscriber to a new observable created with that factory.
export function asyncData<T>(data: T){
    return defer(() => Promise.resolve(data));
}

/* Create async observable error that errors after a JS engine turn */
export function asyncError<T>(errorObject: any){
    return defer(() => Promise.reject(errorObject));
}
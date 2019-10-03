import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SomeService {

  $Test : Subject<any>;

  constructor() { }

  getValue(){
    return 'real value';
  }

  getPromiseValue(){
    return new Promise((resolve, reject) => {
      resolve('promise');
    });
  }
  
}

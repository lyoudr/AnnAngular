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

  getObservableValue(){
    return this.$Test.observers;
  }
}

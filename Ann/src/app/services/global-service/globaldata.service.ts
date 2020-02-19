import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobaldataService {
  public language : BehaviorSubject<string> = new BehaviorSubject('en-us');
  constructor() { }
  
}

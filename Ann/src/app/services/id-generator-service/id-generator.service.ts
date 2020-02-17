import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  constructor() { }

  idGenerator(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

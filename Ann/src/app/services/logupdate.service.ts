import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class LogupdateService {

  constructor(
    private updates : SwUpdate
  ) {}

  Available(){
    this.updates.available.subscribe(event => {
      console.log('current version is =>', event.current);
      console.log('available version is =>',event.available);
    });
  }

  Activated(){
    this.updates.activated.subscribe(event => {
      console.log('old version was =>', event.previous);
      console.log('new version is =>', event.current);
    });
  }
}

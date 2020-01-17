import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PromptupdateServiceService {

  constructor(
    private updates: SwUpdate
  ) { }
  forceUpdate(){
    this.updates.available.subscribe(event => {
      if(event){
        console.log('forceupdate');
        this.updates.activateUpdate().then(() =>
          document.location.reload()
        );
      }
    })
  }
}

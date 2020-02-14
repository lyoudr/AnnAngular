import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  constructor(
    private appRef : ApplicationRef, 
    private updates: SwUpdate) {
  }

  checkForupdate(){
    // Allow the app to stabilize first, before starting polling for updates with 'interval()'
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(60 * 1000); // check for update each minute
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(() => { 
      console.log('update check is =>');
      this.updates.checkForUpdate()
    });
  }
}

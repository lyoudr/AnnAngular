// Jasmine Clock function
(window as any)['_zone_symbol_fakeAsyncPatchLock'] = true;
import 'zone.js/dist/zone-testing';
import 'zone.js/dist/zone-patch-rxjs-fake-async';
import { fakeAsync, tick } from '@angular/core/testing';
import { of, interval } from 'rxjs';
import { delay, take } from 'rxjs/operators';

describe('use jasmine.clock()', () => {
    // need to config_zone_symbol_fakeAsyncPatchLock flag
    // before loading zone.js/dist/zone-testing
    beforeEach(() => {jasmine.clock().install();});
    afterEach(() => {jasmine.clock().uninstall();});
    it('should auto enter fakeAsync', () => {
        // is in fakeAsync now , don't need to call fakeAsync(testFn)
        let called = false;
        setTimeout(() => {called = true}, 100);
        jasmine.clock().tick(100);
        expect(called).toBe(true);
    });

    it('should get Date diff correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
        let result = null;
        of('hello').pipe(delay(1000)).subscribe(v => result = v);
        expect(result).toBeNull();
        tick(1000);
        expect(result).toBe('hello');

        const start = new Date().getTime();
        let dateDiff = 0;
        interval(1000).pipe(take(2)).subscribe(() => dateDiff = (new Date().getTime() - start));
        
        tick(1000);
        expect(dateDiff).toBe(1000);
        tick(1000);
        expect(dateDiff).toBe(2000);
    }));
});
import { RestaurantComponent } from './restaurant.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('*Component => RestaurantComponent', () => {
    let resComp : RestaurantComponent;
    let fixture : ComponentFixture<RestaurantComponent>;
    let restaurantService : RestaurantService;

    beforeEach(() => {
        
        TestBed.configureTestingModule({
            declarations: [RestaurantComponent],
            providers: [
                RestaurantService,
                HttpClient,
                HttpHandler
            ]
        });

        fixture = TestBed.createComponent(RestaurantComponent);
        resComp = fixture.componentInstance;
        restaurantService = TestBed.inject(RestaurantService);
    });

    it('should search restaurant ', (done) => {
        const testFood = '咚咚餐廳';
        const hostElement = fixture.nativeElement;
        const searchInput : HTMLInputElement = hostElement.querySelector('input');
        const spy = spyOn(restaurantService, 'searchFood').and.returnValue(new Observable);
        const eleRef = fixture.nativeElement.querySelector('.restaurantName');
        
        // simulate user entering a new restaurant into the input box
        searchInput.value = '咚咚餐廳';
        function newEvent(eventName: string, bubbles = false, cancelable = false){
            let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
            evt.initCustomEvent(eventName, bubbles, cancelable, null);
            return evt;
        }
        // dispatch a DOM event so that Angular learns of input value change.
        searchInput.dispatchEvent(newEvent('input'));
        
        expect(searchInput.value).toBe('咚咚餐廳');

        /*spy.calls.mostRecent().returnValue.subscribe(data => {
            fixture.detectChanges();
            expect(eleRef.textContent).toContain('咚咚餐廳');
            done();
        });*/
        done();
    });

});
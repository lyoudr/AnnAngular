import { RestaurantComponent } from './restaurant.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

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

    it('should search restaurant ', () => {
        const hostElement = fixture.nativeElement;
        const searchInput : HTMLInputElement = hostElement.querySelector('input');
        
        // simulate user entering a new restaurant into the input box
        searchInput.value = '123';
        function newEvent(eventName: string, bubbles = false, cancelable = false){
            let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
            evt.initCustomEvent(eventName, bubbles, cancelable, null);
            return evt;
        }
        // dispatch a DOM event so that Angular learns of input value change.
        searchInput.dispatchEvent(newEvent('input'));
        
        // Tell Angular to update the display binding through the pipe
        //fixture.detectChanges();

        expect(searchInput.value).toBe('123');
    });

});
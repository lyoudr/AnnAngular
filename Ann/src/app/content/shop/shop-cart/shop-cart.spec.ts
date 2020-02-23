import { ShopCartComponent } from './shop-cart.component';
import { ShopService } from 'src/app/services/shop-service/shop.service';
import { BehaviorSubject } from 'rxjs';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('*Component* => ShopCartComponent', () => {
    let shopServiceStub : Partial<ShopService>;
    let fixture : ComponentFixture<ShopCartComponent>;
    let shopCartComp : ShopCartComponent;
    let shopService : ShopService;

    beforeEach(() => {
        // stub ShopService for test purposes
        shopServiceStub = {
            shopCartNumber: new BehaviorSubject(0), // the number of items in shopping cart
            shopCartLists : []
        };

        TestBed.configureTestingModule({
            declarations: [ShopCartComponent],
            providers: [
                {provide: ShopService, useValue : shopServiceStub}
            ]
        });

        fixture = TestBed.createComponent(ShopCartComponent);
        shopCartComp = fixture.componentInstance;

        // ShopService from the root injector
        shopService = TestBed.inject(ShopService);
    });

    it('should remove item when clicking cancel', () => {
        shopService.shopCartLists = [
            {name: "Gray Shoe", price: 20, description: "Skinny, straight, or slim, find your perfect jeans…led sandals to take your denim from day to night.", brand: "Net",size: "M", color: "pink"},
            {name: "Blue Shoe High Heels", price: 28, description: "Skinny, straight, or slim, find your perfect jeans…led sandals to take your denim from day to night.", brand: "Net",size: "M", color: "pink"},
            {name: "Coat", price: 16, description: "Skinny, straight, or slim, find your perfect jeans…led sandals to take your denim from day to night.", brand: "Net",size: "M", color: "pink"},
        ];
        fixture.detectChanges();
        const removeItem = fixture.nativeElement.querySelector('#Coat');
        removeItem.click();
        expect(shopService.shopCartLists).toEqual([
            {name: "Gray Shoe", price: 20, description: "Skinny, straight, or slim, find your perfect jeans…led sandals to take your denim from day to night.", brand: "Net",size: "M", color: "pink"},
            {name: "Blue Shoe High Heels", price: 28, description: "Skinny, straight, or slim, find your perfect jeans…led sandals to take your denim from day to night.", brand: "Net",size: "M", color: "pink"},
        ])
    });
});
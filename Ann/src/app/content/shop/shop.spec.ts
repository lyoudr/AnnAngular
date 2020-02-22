import { ShopComponent } from "./shop.component";
import { TestBed } from '@angular/core/testing';
import { ShopService } from 'src/app/services/shop-service/shop.service';
import { BehaviorSubject } from 'rxjs';

class MockShopService{
    shopCartNumber : BehaviorSubject<number> = new BehaviorSubject(0);
    shopCartLists : Array<Object> = [];
}

describe('*Component* => ShopComponent', () => {
    let shopComp : ShopComponent;
    let shopService : ShopService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ShopComponent,
                {provide: ShopService, useClass: MockShopService}
            ]
        });
        // inject both the component and dependent service.
        shopComp = TestBed.inject(ShopComponent);
        console.log('shopComp is =>', shopComp);
        shopService = TestBed.inject(ShopService);
    });
    it('should have value 0 shopnumber after construction', () => {
        expect(shopComp.shopnumber).toBe(0);
    });
    it('should has shopnumber after calls ngOnInit', () => {
        shopComp.ngOnInit();
        shopService.shopCartNumber.next(2);
        expect(shopComp.shopnumber).toBe(2);
    });
});
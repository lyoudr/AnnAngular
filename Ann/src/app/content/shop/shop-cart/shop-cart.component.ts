import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop-service/shop.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  shopItems : Array<any> = [];
  shoptitles : Array<any> = ['ITEM','PRICE', 'TOTAL PRICE'];

  constructor(
    public shopService : ShopService
  ) { }

  ngOnInit() {}

  removeItem(name){
    const arryRemove = (arr, value) => {
      let filteredarr = arr.filter((item) => {
        return item.name !== value;
      });
      return filteredarr;
    }
    // remove selected item from shopCartLists
    this.shopService.shopCartLists = arryRemove(this.shopService.shopCartLists, name);
    this.shopService.shopCartNumber.next(this.shopService.shopCartLists.length);
  }
}

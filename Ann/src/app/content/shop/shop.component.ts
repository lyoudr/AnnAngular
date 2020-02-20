import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop-service/shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  
})
export class ShopComponent implements OnInit {

  shopnumber : number = 0;

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.shopService.shopCartNumber.subscribe(number => 
      this.shopnumber = number
    );
  }
}

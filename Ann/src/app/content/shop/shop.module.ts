import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopitemComponent } from './shopitem/shopitem.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ShopComponent,
    ShopitemComponent,
    ShopCartComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ScrollingModule,
    ScrollDispatchModule
  ]
})
export class ShopModule { }

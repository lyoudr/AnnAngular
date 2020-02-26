import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopitemComponent } from './shopitem/shopitem.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ShopAllitemComponent } from './shopall/shop-allitem.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopComponent,
    ShopitemComponent,
    ShopCartComponent,
    ShopAllitemComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ScrollingModule,
    ScrollDispatchModule,
    ReactiveFormsModule
  ]
})
export class ShopModule { }

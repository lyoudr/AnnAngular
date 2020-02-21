import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ShopitemComponent } from './shopitem/shopitem.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component'; 
import { ShopAllitemComponent } from './shopall/shop-allitem.component';
import { CheckoutComponent } from './checkout/checkout.component';

const shoproutes: Routes = [
  { 
    path: '', 
    component : ShopComponent,
    children:[
      {
        path: '',
        component : ShopAllitemComponent
      },
      {
        path: 'item/:id',
        component : ShopitemComponent
      },
      {
        path: 'shopcart',
        component : ShopCartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(shoproutes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }

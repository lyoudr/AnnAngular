import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ShopitemComponent } from './shopitem/shopitem.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component'; 

const shoproutes: Routes = [
  { path: '', 
    component : ShopComponent,
    children: [
      {
        path: 'item/:id',
        component: ShopitemComponent
      },
      {
        path: 'shopcart',
        component: ShopCartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(shoproutes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }

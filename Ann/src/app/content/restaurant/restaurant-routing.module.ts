import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant.component';
import { EachrestaurantComponent } from './eachrestaurant/eachrestaurant.component';


const routes: Routes = [
  {path: '', component: RestaurantComponent},
  {path: 'detail/:id', component: EachrestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }

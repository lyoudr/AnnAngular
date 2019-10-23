import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';

import { TabsModule } from 'ngx-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
} from '@angular/material'
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantChildComponent } from './restaurantchild/restaurant-child.component';
import { ChangecurrencyPipe } from '../../shared/pipes/changecurrency.pipe';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { EachrestaurantComponent } from './eachrestaurant/eachrestaurant.component';

@NgModule({
  declarations: [
    RestaurantComponent,
    RestaurantChildComponent,
    ChangecurrencyPipe,
    HighlightDirective,
    EachrestaurantComponent,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    TabsModule,
    MatTabsModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    ScrollDispatchModule,   
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RestaurantModule { }

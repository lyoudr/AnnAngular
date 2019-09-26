import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussComponent } from './discuss.component';
import { DiscussRoutingModule } from './discuss-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DiscussComponent
  ],
  imports: [
    CommonModule,
    DiscussRoutingModule,
    MatIconModule
  ]
})
export class DiscussModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano.component';
import { PianoRoutingModule } from './piano-routing.module';


@NgModule({
  declarations: [
    PianoComponent
  ],
  imports: [
    CommonModule,
    PianoRoutingModule
  ]
})
export class PianoModule { }

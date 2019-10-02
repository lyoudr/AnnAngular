import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano.component';
import { PianoRoutingModule } from './piano-routing.module';
import { SheetComponent } from './sheet/sheet.component';


@NgModule({
  declarations: [
    PianoComponent,
    SheetComponent
  ],
  imports: [
    CommonModule,
    PianoRoutingModule
  ]
})
export class PianoModule { }

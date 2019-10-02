import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano.component';
import { PianoRoutingModule } from './piano-routing.module';
import { SheetComponent } from './sheet/sheet.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    PianoComponent,
    SheetComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    PianoRoutingModule
  ]
})
export class PianoModule { }

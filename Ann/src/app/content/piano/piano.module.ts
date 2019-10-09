import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoRoutingModule } from './piano-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from '../../shared/shared.module';
import { SheetComponent } from './sheet/sheet.component';
import { PianoComponent } from './piano.component';

@NgModule({
  declarations: [
    PianoComponent,
    SheetComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    PianoRoutingModule,
    SharedModule
  ]
})
export class PianoModule { }

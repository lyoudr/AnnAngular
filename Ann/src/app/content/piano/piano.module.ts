import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoRoutingModule } from './piano-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from '../../shared/shared.module';
import { SheetComponent } from './sheet/sheet.component';
import { PianoComponent } from './piano.component';
import { SheetdetailComponent } from './sheetdetail/sheetdetail.component';

@NgModule({
  declarations: [
    PianoComponent,
    SheetComponent,
    SheetdetailComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    PianoRoutingModule,
    SharedModule
  ]
})
export class PianoModule { }

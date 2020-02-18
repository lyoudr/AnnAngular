import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { DatetransformPipe } from './pipes/datetransform.pipe';
import { RankpiecesPipe } from './pipes/rankpieces.pipe';
import { ModalComponent } from './component/modal/modal.component';

@NgModule({
  declarations: [
    DatetransformPipe,
    RankpiecesPipe,
    ModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DatetransformPipe,
    RankpiecesPipe,
    ModalComponent
  ]
})
export class SharedModule { }

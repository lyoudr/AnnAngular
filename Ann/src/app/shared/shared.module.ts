import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { DatetransformPipe } from './pipes/datetransform.pipe';
import { RankpiecesPipe } from './pipes/rankpieces.pipe';

@NgModule({
  declarations: [
    DatetransformPipe,
    RankpiecesPipe,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DatetransformPipe,
    RankpiecesPipe
  ]
})
export class SharedModule { }

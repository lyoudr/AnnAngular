import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { DatetransformPipe } from './pipes/datetransform.pipe';

@NgModule({
  declarations: [
    DatetransformPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DatetransformPipe
  ]
})
export class SharedModule { }

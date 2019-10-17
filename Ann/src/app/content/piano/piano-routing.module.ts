import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PianoComponent } from './piano.component';
import { SheetdetailComponent } from './sheetdetail/sheetdetail.component';

export const pianoroutes: Routes = [
  {
    path: '', 
    component: PianoComponent,
    children: [
      {
        path: 'sheetdetail/:id',
        component: SheetdetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pianoroutes)],
  exports: [RouterModule]
})
export class PianoRoutingModule { }

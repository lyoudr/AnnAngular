import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PianoComponent } from './piano.component';
import { SheetComponent } from './sheet/sheet.component';

export const pianoroutes: Routes = [
  {
    path: '', 
    component: PianoComponent,
    children: [
      {
        path: ':id',
        component: SheetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pianoroutes)],
  exports: [RouterModule]
})
export class PianoRoutingModule { }

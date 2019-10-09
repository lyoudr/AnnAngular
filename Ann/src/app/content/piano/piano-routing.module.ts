import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PianoComponent } from './piano.component';

export const pianoroutes: Routes = [
  {
    path: '', 
    component: PianoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(pianoroutes)],
  exports: [RouterModule]
})
export class PianoRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const approutes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./content/blog/blog.module').then(mod => mod.BlogModule)
  },
  {
    path: 'discuss',
    loadChildren: () => import('./content/discuss/discuss.module').then(mod => mod.DiscussModule)
  },
  {
    path: 'piano',
    loadChildren: () => import('./content/piano/piano.module').then(mod => mod.PianoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

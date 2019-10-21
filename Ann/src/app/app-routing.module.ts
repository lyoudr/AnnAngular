import { NgModule } from '@angular/core';
import { LoginComponent } from './content/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const approutes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'blog',
    loadChildren: () => import('./content/blog/blog.module').then(mod => mod.BlogModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'discuss',
    loadChildren: () => import('./content/discuss/discuss.module').then(mod => mod.DiscussModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'piano',
    loadChildren: () => import('./content/piano/piano.module').then(mod => mod.PianoModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'calendar',
    loadChildren : () => import('./content/calendar/calendar.module').then(mod => mod.CalendarModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BloghomeComponent } from './bloghome/bloghome.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { AddpostComponent } from './addpost/addpost.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'postlist',
        component: BloghomeComponent,
        children: [
          {
            path: 'post/:id',
            component: BlogpostComponent
          }
        ]
      },
      {
        path: 'addpost',
        component: AddpostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }

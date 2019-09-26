import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BloghomeComponent } from './bloghome/bloghome.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { AddpostComponent } from './addpost/addpost.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    BlogComponent,
    BloghomeComponent,
    BlogpostComponent,
    AddpostComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule
  ]
})
export class BlogModule { }

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-bloghome',
  templateUrl: './bloghome.component.html',
  styleUrls: ['./bloghome.component.scss']
})
export class BloghomeComponent implements OnInit {


  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }
  postlist: any = this.blogService.postlist;

  ngOnInit() {
    $('#bloglist').fadeIn(1000);
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        if(event.url === '/blog/postlist'){
          $('#bloglist').fadeIn(1000);
        }
      } 
    })
  }
  hidePostlist(){
    $('#bloglist').fadeOut(1000);
  }
}

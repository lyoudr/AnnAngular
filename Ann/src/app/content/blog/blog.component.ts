import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router';
import WOW from 'wow.js';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    $('#blogImg').fadeIn(1000);
    // Using Wow.js
    new WOW().init();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        if(event.url === '/blog'){
          $('#blogImg').fadeIn(1000);
        }
      }
    })
  }
  hideBlogImg(){
    $('#blogImg').fadeOut(1000);
  }
}

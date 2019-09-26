import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }
  navlists : any[] = [
    {'url':'/blog', 'title': 'Blog'},
    {'url':'/discuss', 'title': 'Discuss'},
    {'url':'/piano', 'title': 'Piano'},
  ]
  ngOnInit() {
  }

}

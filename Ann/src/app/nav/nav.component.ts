import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }
  navlists : any[] = [
    {'url':'/blog', 'title': 'Blog'},
    {'url':'/discuss', 'title': 'Discuss'},
    {'url':'/piano', 'title': 'Piano'},
    
  ]

  ngOnInit() {
  }

}
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router }      from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private cookieService : CookieService,
    public router: Router
  ) { }
  navlists : any[] = [
    {'url':'/blog', 'title': 'Blog'},
    {'url':'/discuss', 'title': 'Discuss'},
    {'url':'/piano', 'title': 'Piano'},
    
  ]

  ngOnInit() {
  }


  logOut(){
    this.authService.isLoggedIn = false;
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
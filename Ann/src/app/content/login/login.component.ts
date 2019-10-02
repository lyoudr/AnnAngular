import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router }      from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private cookieService : CookieService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  Login(name, password){
    let UserInfo = {
      'name' : name,
      'password' : password
    }
    this.authService.Login(UserInfo)
      .subscribe(data => {
        console.log('returned data is =>', data)
        if(data.response == 'ok'){
          // save the identity to cookie
          this.cookieService.delete('UserID');
          this.cookieService.set('UserID',data.token);
          this.authService.isLoggedIn = true;
        } else {
          this.authService.isLoggedIn = false;
        }
        this.ReNavigate();
      });
  }

  ReNavigate(){
    if(this.authService.isLoggedIn == true){
      let redirect = this.authService.redirectUrl ? 
      this.router.parseUrl(this.authService.redirectUrl) : '/blog';
      // Redirect the user
      this.router.navigateByUrl(redirect);
    }
  }
}
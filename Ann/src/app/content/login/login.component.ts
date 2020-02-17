import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router }      from '@angular/router';
import { interval, of } from 'rxjs';

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
        if(data.message == 'OK'){
          // save the identity to cookie
          this.cookieService.delete('AccessToken');
          this.cookieService.set('AccessToken',data.token);
          this.cookieService.set('UserID', name);
          this.authService.isLoggedIn = true;
          this.authService.countdown$ = interval(1000);
          this.authService.countdownTimer$ = this.authService.countdown$.subscribe(time => {
            this.authService.counter = this.authService.counter - 1;
          });
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

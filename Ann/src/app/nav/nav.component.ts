import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { GlobaldataService } from '../services/global-service/globaldata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private cookieService : CookieService,
    public globalDataService : GlobaldataService,
    public router: Router
  ) { }
  navlists : any[] = [
    {'url':'/blog', 'title': 'Blog', linkfocus : false},
    {'url':'/discuss', 'title': 'Discuss', linkfocus : false},
    {'url':'/piano', 'title': 'Piano', linkfocus : false},
    {'url':'/calendar', 'title': 'Calendar', linkfocus : false},
    {'url':'/restaurant', 'title':'Restaurant', linkfocus : false},
    {'url': '/shop', 'title': 'Shop', linkfocus: false}
  ];
  languages : Array<Object> = [
    {name: '中', id: 'zh-tw'}, 
    {name: 'En', id: 'en-us'}
  ];
  isOpen : boolean = false;
  isOpenLang : boolean = false;
  

  ngOnInit() {
    this.detectLangChange();
  }


  logOut(){
    this.authService.countdownTimer$.unsubscribe();
    this.authService.counter = 900;
    this.authService.isLoggedIn = false;
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  ActiveLink(event, index){
    if(event == 'click'){
      this.navlists.forEach(item => {
        item.linkfocus = false;
      });
      this.navlists[index]['linkfocus'] = true;
    } else if(event == 'mouseover'){
      this.navlists[index]['linkfocus'] = true;
    } else if(event == 'mouseleave'){
      this.navlists[index]['linkfocus'] = false;
    }
  }

  selectLang(language){
    this.globalDataService.language.next(language);
  }

  detectLangChange(){
    this.globalDataService.language.subscribe(lang => 
      console.log('lang is =>', lang)
    );
  }
}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  showfooter: boolean = false;
  constructor() { }

  ngOnInit() {
    this.showFooter();
  }
  showFooter(){
    window.onscroll = (event) => {
      if((window.innerHeight + window.scrollY) > document.body.offsetHeight){
        this.showfooter = true;
        console.log('bottom');
      } else if((window.innerHeight + window.scrollY) <= document.body.offsetHeight){
        this.showfooter = false;
      }
    }
  }
}

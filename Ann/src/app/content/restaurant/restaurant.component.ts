import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { RestaurantService } from 'src/app/services/restaurant-service/restaurant.service';
import WOW from 'wow.js';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  
  restaurantlists: any;
  pagenumber : number;
  classification : string;
  tabIndex : number;
  checkedlow:boolean = false;
  checkedmedium : boolean = false;
  checkedhigh : boolean = false;
  type: string;
  low : string = "low";
  medium : string = "medium";
  high : string = "high";
  checkedTWD : boolean = false;
  checkedJPY : boolean = false;
  checkedUSD : boolean = false;
  TWD = "TWD";
  JPY = "JPY";
  USD = "USD";
  @ViewChild('result', {static: true}) resultTab: any;

  constructor(
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.DefineType(1, "sweet");
    this.type= "sweet";
    new WOW().init();
  }

  /*1. Get restaurant lists */
  DefineType(pagenumber, classification : string){
    this.pagenumber = pagenumber;
    this.classification = classification;
    this.restaurantService.Getrestaurant(this.pagenumber, this.classification)
      .subscribe((restaurantlists)=>{
        this.restaurantlists = restaurantlists;
      })
  }

  /*2. Choose different type of restaurants */
  tabFocusChange($event: MatTabChangeEvent){
    this.tabIndex = $event.index;
    if(this.tabIndex == 0){
      this.DefineType(1, 'sweet');
      this.type = 'sweet';
    } else if (this.tabIndex == 1){
      this.DefineType(1, "righteous");
      this.type = "righteous";
    } else if (this.tabIndex == 2){
      this.DefineType(1, "chinese");
      this.type = "chinese";
    }
  }

  /* Reset Price range */
  Reset(event: any){
    if(event == 'sweet'){
      this.DefineType(1, 'sweet');
    } else if(event == 'righteous') {
      this.DefineType(1, 'righteous');
    } else if(event == 'chinese') { 
      this.DefineType(1, 'chinese');
    } else if(event == 'search'){
      this.DefineType(1, 'sweet');
    }
  }

  /* Search Food */
  searchFood(food : string){
    this.restaurantService.searchFood(food)
      .subscribe(data => {
        console.log('data is =>', data);
        this.tabIndex = 3;
        this.restaurantlists = data;
        this.type = 'search';
      });
  }
}

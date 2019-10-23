import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { RestaurantService } from 'src/app/services/restaurant.service';


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

  constructor(
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.DefineType(1, "sweet");
    this.type= "sweet";
  }

  /*1. Get restaurant lists */
  DefineType(pagenumber, classification : string){
    this.pagenumber = pagenumber;
    this.classification = classification;
    console.log('classification =>', this.classification);
    this.restaurantService.Getrestaurant(this.pagenumber, this.classification)
      .subscribe((restaurantlists)=>{
        console.log('回傳的餐廳清單 =>', restaurantlists);
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
    }
  }

  /* Search Food */
  searchFood(food){
    console.log('food is =>', food);
  }
}

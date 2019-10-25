import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {} from 'googlemaps';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.min.js';


@Component({
  selector: 'app-eachrestaurant',
  templateUrl: './eachrestaurant.component.html',
  styleUrls: ['./eachrestaurant.component.scss']
})
export class EachrestaurantComponent implements OnInit {
  
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  name: string;
  restaurantId : string;
  restaurantName: Object = {
    '01': '咚咚餐廳',
    '02': '哈摟餐廳',
    '03': '每每餐廳',
    '04': '美麗餐廳',
    '05': '義大餐廳',
    '06': '樂樂餐廳',
    '07': '您好餐廳',
    '08': '安安餐廳',
    '09': '武道餐廳',
    '10': '湯包餐廳',
    '11': '享用餐廳',
    '12': '素菜餐廳',
  };
  /* Slick */
  slides: Array<any> = [];
  
  /*Latitude and longitude */
  LatLng : Array<any> = [35.2271, -80.8431];

  /* Comment Form */
  commentForm = this.fb.group({
    title : [''],
    content : ['']
  });

  messages : any = [];
  stars : Array<any> = [0,1,2,3,4];
  selectedstarIndex : number = -1;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private restaurantService : RestaurantService
  ) { }

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    this.initGoogleMap();
    this.getMapandRestaurantInfo();
    this.getComment();
  }
  
  initGoogleMap(){
    const mapProperties = {
      center : new google.maps.LatLng(this.LatLng[0], this.LatLng[1]),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties)
  }

  getMapandRestaurantInfo(){
    this.restaurantService.GetPost(this.restaurantId)
      .subscribe(data => {
        this.LatLng = data[0].LatLng
        this.slides = data;
        this.name = this.restaurantName[this.restaurantId];
        this.slick();
      });
  }

  // Enable Sliding
  slick(){
    $(document).ready(function(){
      $('.slide').slick({
        lazyLoad: 'ondemand',
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
      });
    });
  }

  // Get comment info
  getComment(){
    this.restaurantService.getComment(this.restaurantId)
      .subscribe(data => {
        if(data.response == 'ok'){
          this.messages = data.comments;
        }
      });
  }
  // Submit Comment
  submitComment(){
    this.commentForm.value.restaurantId = this.route.snapshot.paramMap.get('id');
    this.commentForm.value.rankstar = this.selectedstarIndex;
    console.log('this.commentForm.value is =>', this.commentForm.value);
    this.restaurantService.sentComment(this.commentForm.value)
      .subscribe(data =>{
        console.log('data is =>', data);
        if(data.response == 'ok'){
          this.messages = data.comments;
        }
      });
  }

  // Ranking
  rankStar(starindex){
    this.selectedstarIndex = starindex;
  }
}

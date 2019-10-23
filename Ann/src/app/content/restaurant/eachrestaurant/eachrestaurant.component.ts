import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
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
  /* Slick */
  slides: Array<any> = [];
  
  /*Latitude and longitude */
  LatLng : Array<any> = [35.2271, -80.8431];

  constructor(
    private route: ActivatedRoute,
    private restaurantService : RestaurantService
  ) { }

  ngOnInit() {
    this.initGoogleMap();
    this.getMapInfo();
  }
  
  initGoogleMap(){
    const mapProperties = {
      center : new google.maps.LatLng(this.LatLng[0], this.LatLng[1]),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties)
  }

  getMapInfo(){
    let restaurantId = this.route.snapshot.paramMap.get('id');
    this.restaurantService.GetPost(restaurantId)
      .subscribe(data => {
        this.LatLng = data[0].LatLng
        this.slides = data;
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
}

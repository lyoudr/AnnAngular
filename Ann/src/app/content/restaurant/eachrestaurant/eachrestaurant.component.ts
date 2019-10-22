import { Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eachrestaurant',
  templateUrl: './eachrestaurant.component.html',
  styleUrls: ['./eachrestaurant.component.scss']
})
export class EachrestaurantComponent implements OnInit {
  
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initGoogleMap();
    this.getMapInfo();
  }

  initGoogleMap(){
    const mapProperties = {
      center : new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties)
  }

  getMapInfo(){
    let id = this.route.snapshot.paramMap.get('id');
    console.log('id is =>', id);
  }
}

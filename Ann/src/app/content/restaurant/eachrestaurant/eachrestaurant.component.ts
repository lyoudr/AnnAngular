import { Component, OnInit, ViewChild } from '@angular/core';
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
  slides: Array<any> = [
    { img: 'assets/image/restaurant/cuisine/tater_tots.jpg', title: 'Tater tots', content: 
      [
        "We love French fries, but for an American food variation on the potato theme, one beloved at Sonic drive-ins and school cafeterias everywhere, consider the Tater Tot.",
        "Notice it often has the registered trademark -- these commercial hash brown cylinders are indeed proprietary to the Ore-Ida company. If you'd been one of the Grigg brothers who founded Ore-Ida, you'd have wanted to come up with something to do with leftover slivers of cut-up potatoes, too. They added some flour and seasoning and shaped the mash into tiny tots and put them on the market in 1956. A little more than 50 years later, America is eating about 32 million kilos of these taters annually."
      ]
    },
    {
      img: 'assets/image/restaurant/cuisine/banana_split.jpg', title: 'Banana Split', content: 
      [
        "Like the banana makes it good for you. Still, kudos to whoever invented the variation of the sundae known as the banana split. There's the 1904 Latrobe, Pennsylvania, story, in which future optometrist David Strickler was experimenting with sundaes at a pharmacy soda fountain, split a banana lengthwise, and put it in a long boat dish.",
        "And the 1907 Wilmington, Ohio, story, wherein restaurant owner Ernest Hazard came up with it to draw students from a nearby college. Fame spread after a Walgreens in Chicago made the split its signature dessert in the 1920s. Whatever the history, you'll find plenty food for thought at the annual Banana Split Festival, which takes place on the second weekend in June in Wilmington."
      ]
    },
    {
      img: 'assets/image/restaurant/cuisine/smores.jpg', title: "S'mores", content: 
      [
        "Proust's madeleines? We'll go you one better on remembrance of things past: s'mores.",
        "Gooey, melty, warm and sweet -- nothing evokes family vacations and carefree camping under the stars quite like this classic American food.",
        "Whether they were first to roast marshmallows and squish them between graham crackers with a bar of chocolate no one seems to know, but the Girl Scouts were the first to get the recipe down in the 1927 'Tramping and Trailing with the Girl Scouts,' transforming many a standard-issue campfire into a quintessential experience.",
        "Celebrate sweetly on August 10: It's National S'mores Day. Get those marshmallow sticks sharpened."
      ]
    }
  ];
  
  constructor(
    private route: ActivatedRoute,
    private restaurantService : RestaurantService
  ) { }

  ngOnInit() {
    this.slick();
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
    let restaurantId = this.route.snapshot.paramMap.get('id');
    this.restaurantService.GetPost(restaurantId)
  }

  // Enable Sliding
  slick(){
    $(document).ready(function(){
      $('.slide').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
      });
    });
  }
}

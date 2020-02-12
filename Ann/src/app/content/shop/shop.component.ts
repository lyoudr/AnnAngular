import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  commdities: Array<any> = [];
  imgSources : SafeResourceUrl ;
  prices : Array<any> = [10, 20, 30];

  constructor(
    private shopService : ShopService,
    private sanitizer : DomSanitizer,
  ) { }

  ngOnInit() {
    this.getpopularCommodities();
  }

  /* Get popular commodities */
  getpopularCommodities(){
    // Get commodities information
    this.shopService.getpopularCommodities()
      .subscribe(commodities => {
        this.commdities = commodities;
      });
    // Get commodities pictures
    this.shopService.getcommditiesPhoto()
      .subscribe((photo: any) => {
        console.log('photo is =>', photo);
        photo = photo.map(src => { 
          return this.sanitizer.bypassSecurityTrustUrl(src)
        });
          this.imgSources = photo;
      });
  }

  // Closure Function
  selectPrice(price){
    this.commdities = this.commdities.map(commdity => {
      if(commdity.price <= price){
        return commdity.price;
      };
    });
    console.log('this.commdities is =>', this.commdities);
  }
}

import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop-service/shop.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shopitem',
  templateUrl: './shopitem.component.html',
  styleUrls: ['./shopitem.component.scss']
})
export class ShopitemComponent implements OnInit {
  $commodity : Observable<any>;
  itemdetail : any;
  isAddToCart : boolean = false;
  sizes : Array<any> = [
    {name: 'S', choose: false}, 
    {name: 'M', choose: false}, 
    {name: 'L', choose: false}, 
    {name: 'XL', choose: false}
  ];
  colors : Array<any> = [
    {name: 'red', choose: false}, 
    {name: 'blue', choose: false}, 
    {name: 'pink', choose: false},
    {name: 'green', choose: false}
  ];
  choosedSize : string = undefined; 
  choosedColor : string = undefined; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService : ShopService,
    private sanitizer : DomSanitizer,
  ) { }

  ngOnInit() {
    this.$commodity = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.shopService.getcommdityDetail(params.get('id'))
      })
    );
    this.$commodity.subscribe(commoditydetail => {
      commoditydetail.picture = this.sanitizer.bypassSecurityTrustUrl(commoditydetail.picture);
      this.itemdetail = commoditydetail;
    });
  }

  chooseSize(size, ischoose){
    this.sizes.forEach(item => {
      if(item.name !== size){
        item.choose = false;
      }
    });
    ischoose ? this.choosedSize = size : this.choosedSize = undefined;
  }

  chooseColor(color, ischoose){
    this.colors.forEach(item => {
      if(item.name !== color){
        item.choose = false;
      }
    });
    ischoose ? this.choosedColor = color : this.choosedColor = undefined;
  }
  
  addToCart(){
    
    if(!this.choosedSize || !this.choosedColor){
      alert('Please both choose size and color! Thank you.');
      this.isAddToCart = false;
      return;
    } else {
      setTimeout(() => this.isAddToCart = true, 500);
      this.itemdetail.size = this.choosedSize;
      this.itemdetail.color = this.choosedColor;
      this.shopService.shopCartLists.push(this.itemdetail);
      this.shopService.shopCartNumber.next(this.shopService.shopCartLists.length);
    }
  }
}

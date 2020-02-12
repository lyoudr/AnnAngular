import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopitem',
  templateUrl: './shopitem.component.html',
  styleUrls: ['./shopitem.component.scss']
})
export class ShopitemComponent implements OnInit {
  $commodity : Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService : ShopService
  ) { }

  ngOnInit() {
    this.$commodity = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.shopService.getcommdityDetail(params.get('id')))
    );
    
    this.$commodity.subscribe(commoditydetail =>
      console.log('commoditydetail is =>', commoditydetail)
    );
  }

}

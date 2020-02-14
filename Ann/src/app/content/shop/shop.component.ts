import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ShopService } from '../../services/shop-service/shop.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CollectionViewer, DataSource  } from '@angular/cdk/collections';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ShopComponent implements OnInit {
  commdities = new MyDataSource(this.shopService);
  imgSources : SafeResourceUrl ;
  prices : Array<any> = [10, 20, 30];
  sizes : Array<string> = ['small(S)', 'medium(M)', 'large(L)', 'extra-large(XL)']
  brands : Array<string> = ['Zara', 'H&M', 'uniqulo', 'Net'];
  selectItems: Array<Object> = [
    {name: 'price', arrays: this.prices, isOpen: false},
    {name: 'size', arrays: this.sizes, isOpen: false},
    {name: 'brand', arrays: this.brands, isOpen: false}
  ]
  constructor(
    private shopService : ShopService,
    private sanitizer : DomSanitizer,
  ) { }

  ngOnInit() {
    this.getpopularCommodities();
  }

  /* Get popular commodities */
  getpopularCommodities(){
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
}

export class MyDataSource extends DataSource<any | undefined>{
  private pageSize = 10000;
  private initialData : any[] =[
    {name: 'Gray Shoe', price: 20.00, picture: ''},
    {name: 'Blue Shoe High Heels', price: 28.00, picture: ''},
    {name: 'Danim Jacket', price: 28.00, picture: ''},
    {name: 'Leather Green Bag', price: 25.00, picture: ''},
    {name: 'Smooth Cloth', price: 15.00, picture: ''},
    {name: 'Yellow Jacket', price: 58.00, picture: ''}
  ];
  private fetchPages = new Set<number>();
  private subscription = new Subscription();
  
  // A BehaviorSubject holds one value. When it is subscribed it emits the value immediately.
  // A Subject doesn't hold a value.
  // https://stackoverflow.com/questions/43348463/what-is-the-difference-between-subject-and-behaviorsubject
  private dataStream = new BehaviorSubject<(string | undefined)[]>(this.initialData)

  constructor(private shopService: ShopService){
    super();
  }
  connect(collectionViewer: CollectionViewer): Observable<(string |undefined)[]>{
    // fetch page from 1 to pageSize when scrolling
    this.subscription.add(collectionViewer.viewChange.subscribe((range) => {
      console.log('range is =>', range);
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end - 1);
      for(let i = startPage; i <= endPage; i++){
        this.fetchPage(i);
      }
    }));
    return this.dataStream;
  }

  disconnect(){
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number):number{
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number){
    if(this.fetchPages.has(page)){
      return;
    }
    this.fetchPages.add(page);
    console.log('this.fetchPages is =>', this.fetchPages);
    this.shopService.getpopularCommodities()
      .subscribe((data) => {
        console.log('data is =>', data);
        this.dataStream.next(data);
      });
  }
}

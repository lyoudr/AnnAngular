import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ShopService } from '../../services/shop-service/shop.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { CollectionViewer, DataSource  } from '@angular/cdk/collections';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ShopComponent implements OnInit {
  commdities = new MyDataSource(this.shopService, this.sanitizer, null);
  imgSources : SafeResourceUrl; // photo image source
  prices : Array<any> = [10, 20, 30];
  sizes : Array<string> = ['small(S)', 'medium(M)', 'large(L)', 'extra-large(XL)']
  brands : Array<string> = ['Zara', 'H&M', 'uniqulo', 'Net'];
  selectItems: Array<Object> = [
    {name: 'price', arrays: this.prices, isOpen: false},
    {name: 'size', arrays: this.sizes, isOpen: false},
    {name: 'brand', arrays: this.brands, isOpen: false}
  ];
  searchText$ = new Subject<string>();
  searchObserve$ : Observable<any>;

  constructor(
    private shopService : ShopService,
    private sanitizer : DomSanitizer,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    //this.getpopularCommodities();
    this.searchObserve$ = this.searchText$.pipe(
      debounceTime(1000), // wait for user to stop typing (1 second in the case)
      distinctUntilChanged(), // wait until the search text changes.
      switchMap(searchVal => // send the search request to the service.
        this.shopService.getSearchResult(searchVal)
      )
    );
    this.searchObserve$.subscribe(data => {
      if(data.length != 0 && data[0] !== null){
        console.log('1');
        data = data.map(item => {
          item.picture = this.sanitizer.bypassSecurityTrustUrl(item.picture);
          return item;
        });
        this.commdities = new MyDataSource(this.shopService, this.sanitizer, data);
        this.changeDetectorRefs.detectChanges();
      } else if(data[0] === null || !data) {
        console.log('2');
        this.commdities = new MyDataSource(this.shopService, this.sanitizer, null);
        this.changeDetectorRefs.detectChanges();
      }
    });
  }

  /* Search Shop items */
  onKey(searchVal : string){
    this.searchText$.next(searchVal);
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
  private isCached : boolean = false; // record if API "popularItems" has been called

  constructor(
    private shopService: ShopService,
    private sanitizer : DomSanitizer,
    private searchVal : any,
  ){
    super();
  }
  connect(collectionViewer: CollectionViewer): Observable<(string |undefined)[]>{
    if(this.searchVal){
      this.dataStream.next(this.searchVal);
      return this.dataStream;
    } 
    // fetch page from 1 to pageSize when scrolling
    this.subscription.add(collectionViewer.viewChange.subscribe((range) => {
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
    this.shopService.getpopularCommodities()
      .subscribe((data) => {
        data = data.map(item => {
          if(item.isCached){
            return item;
          }
          item.picture = this.sanitizer.bypassSecurityTrustUrl(item.picture);
          return item;
        });
        this.dataStream.next(data);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoitemComponent } from './todoitem/todoitem.component';
import WOW from 'wow.js';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { IdGeneratorService } from '../../services/id-generator-service/id-generator.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  Year: any;
  Month:string;
  datespermonth: number ;
  datesarray : any = [];
  initialmonth : any;
  currentmonth: any;
  substractyear: number = 0;
  parenttodolists: any;
  date : number;
  listStyles: {};
  user: any;
  isMemorandumOpen : boolean = false;
  memorandum : any = {
    user: '',
    data: {
      "Jan":[],
      "Feb":[],
      "Mar":[],
      "Apr":[],
      "May":[],
      "Jun":[],
      "July":[],
      "Aug":[],
      "Sep":[],
      "Oct":[],
      "Nov":[],
      "Dec":[],
    }
  };

  constructor(
    public dialog: MatDialog,
    public calendarService: CalendarService,
    private cookieService: CookieService,
    private idGeneratorService : IdGeneratorService,
  ) { }

  ngOnInit() {
    new WOW().init();
    this.GetNow();
    // define user
    const user = this.cookieService.get('UserID').replace('Token','');
    this.user = user.charAt(0).toUpperCase() + user.slice(1);
    this.getMemorandum();
  } 

  GetNow(){
    var currenttime = new Date();
    /*設定年份*/
    this.Year = currenttime.getFullYear();
    /*設定月份*/
    var month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    this.initialmonth = currenttime.getMonth();
    var Month = month[this.initialmonth];
    this.Month = Month;
    /*判斷此月份的天數*/
    if(((this.initialmonth + 1) % 2) != 0){
      if((this.initialmonth + 1) < 9){
        this.datespermonth = 32;
      } else {
        this.datespermonth = 31;
      }
    } else {
      if ((this.initialmonth + 1) == 2) {
        //閏年判斷
        if(this.Year % 4 != 0){
          this.datespermonth = 29
        } else if (this.Year % 4 == 0 && this.Year % 100 != 0) {
          this.datespermonth = 30
        } else if (this.Year % 100 == 0 && this.Year % 400 != 0) {
          this.datespermonth = 29
        } else if (this.Year % 400 == 0) {
          this.datespermonth = 30
        }
      } else {
        if((this.initialmonth + 1) < 8){
          this.datespermonth = 31
        } else if ((this.initialmonth + 1) >= 8) {
          this.datespermonth = 32
        }
      }
    }
    /*設定目前時間*/
    currenttime.setMonth(this.initialmonth);
    currenttime.setDate(1);
    for(var j = 0; j < (currenttime.getDay()); j++){
      let eachtimeresult = { date: '', data: [] }
      this.datesarray.push(eachtimeresult);
    }
    for (var i = 1; i < this.datespermonth; i ++){
      var current = new Date();
      current.setDate(i);
      current.getDay();
      this.datesarray.push({date: current.getDate(), data: [] });             
    }
  }

  Prev(){
    this.datesarray = [];
    /*設定月份*/
    var month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    this.initialmonth = this.initialmonth - 1;
      /* 根據月份判斷年份 */
    if (this.initialmonth < 0) {
      this.initialmonth = 11;
      this.Year = this.Year - 1;
    } 
    var Month = month[this.initialmonth];
    this.Month = Month;
    /*判斷此月份的天數*/
    if(((this.initialmonth + 1) % 2) != 0){
      if((this.initialmonth + 1) < 9){
        this.datespermonth = 32;
      } else {
        this.datespermonth = 31;
      }
    } else {
      if ((this.initialmonth + 1) == 2) {
        //閏年判斷
        if(this.Year % 4 != 0){
          this.datespermonth = 29
        } else if (this.Year % 4 == 0 && this.Year % 100 != 0) {
          this.datespermonth = 30
        } else if (this.Year % 100 == 0 && this.Year % 400 != 0) {
          this.datespermonth = 29
        } else if (this.Year % 400 == 0) {
          this.datespermonth = 30
        }
      } else {
        if((this.initialmonth + 1) < 8){
          this.datespermonth = 31
        } else if ((this.initialmonth + 1) >= 8) {
          this.datespermonth = 32
        }
      }
    }
    this.GenerateDate();
  }

  Next(){
    this.datesarray = [];
    /*設定月份*/
    var month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    this.initialmonth = this.initialmonth + 1;
    /* 根據月份判斷年份 */
    if (this.initialmonth > 11) {
      this.initialmonth = 0;
      this.Year = this.Year + 1;
    } 
    var Month = month[this.initialmonth];
    this.Month = Month;
    /*判斷此月份的天數*/
    if(((this.initialmonth + 1) % 2) != 0){
      if((this.initialmonth + 1) < 9){
        this.datespermonth = 32;
      } else {
        this.datespermonth = 31;
      }
    } else {
      if ((this.initialmonth + 1) == 2) {
        //閏年判斷
        if(this.Year % 4 != 0){
          this.datespermonth = 29
        } else if (this.Year % 4 == 0 && this.Year % 100 != 0) {
          this.datespermonth = 30
        } else if (this.Year % 100 == 0 && this.Year % 400 != 0) {
          this.datespermonth = 29
        } else if (this.Year % 400 == 0) {
          this.datespermonth = 30
        }
      } else {
        if((this.initialmonth + 1) < 8){
          this.datespermonth = 31
        } else if ((this.initialmonth + 1) >= 8) {
          this.datespermonth = 32
        }
      }
    } 
    this.GenerateDate();
  }

  GenerateDate(){
    var currenttime = new Date();
    currenttime.setFullYear(this.Year);
    currenttime.setMonth(this.initialmonth);
    currenttime.setDate(1);
    for(var j = 0; j < (currenttime.getDay()); j++){
      let eachtimeresult = { date: '', data: [] }
      this.datesarray.push(eachtimeresult);
    }
    for (var i = 1; i < this.datespermonth; i ++){
      currenttime.setDate(i);
      currenttime.getDay();
      this.datesarray.push({date: currenttime.getDate(), data: []});             
    }
    // Call API for memorandum of each month
    this.getMemorandum();
  }
  /* Call API for memorandum of each month */
  getMemorandum(){
    this.calendarService.getTodolist(this.Month, this.user)
      .subscribe(data => {
        if(data[0]){
          this.datesarray = data;
        };
      });
  }
  /* Add new Item */
  OpenModal(date: any): void{
    let currenttime = new Date();
    currenttime.setFullYear(this.Year);
    currenttime.setMonth(this.initialmonth);
    currenttime.setDate(1);
    let dateindex = (currenttime.getDay() + date);
    
    const dialogRef = this.dialog.open(TodoitemComponent, {
      width: '500px',
      height: '400px',
      data: {todolists: this.parenttodolists}
    });

    dialogRef.afterClosed().subscribe(result => {
      let results = result;
      results[0].forEach(item => {
        item.Id = this.idGeneratorService.idGenerator();
      });
      // define datesarray
      this.datesarray[(dateindex - 1)] = {
        date: date, 
        data: results
      };
      // define memorandum
      this.memorandum.user = this.user;
      this.memorandum.data[this.Month] = this.datesarray;
      this.calendarService.postTodolists(this.memorandum)
        .subscribe(data => {
          console.log('returned data is =>', data);
        });
      this.listStyles = {
        'font-size': '12px',
        'list-style-type':'none'
      };
    });
  }

  /* Open memorandum */
  openMemo(date: any){
    this.date = date;
    var founditem = this.datesarray.filter(obj => {
      return obj.date === date;
    });
    this.calendarService.memorandumlists = founditem[0].data[0];
  }

  /* See memorandum detail */
  memorandumDetail(memorandumId){
    this.calendarService.getTodolistDetail(this.user, this.Month, this.date, memorandumId)
      .subscribe(detail => console.log('detail is =>', detail));
  }
}

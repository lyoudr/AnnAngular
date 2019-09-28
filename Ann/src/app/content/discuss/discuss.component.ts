import { Component, OnInit } from '@angular/core';
import { DiscussService } from '../../services/discuss.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.scss']
})
export class DiscussComponent implements OnInit {

  user: string;
  messages : any[] = [
    {name:'Json', conversation: 'hello...', date: '2019/09/05'},
    {name:'Joy', conversation: 'hello Joy...', date: '2019/09/05'},
    {name:'Amy', conversation: 'hello.....', date: '2019/09/05'},
    {name:'Tonal', conversation: 'hello.....', date: '2019/09/05'}];
  phones: any[] = [
    {name: 'Json'},
    {name: 'Joy'},
    {name: 'Amy'},
    {name: 'Tonal'},
    {name: 'Joanna'}
  ]
  contacts : any[] = [
    {name: 'Json'},
    {name: 'Joy'},
    {name: 'Amy'},
    {name: 'Tonal'},
    {name: 'Joanna'}
  ]
  chattype: string = 'chat';
  personalmessages : any[] = [];
  searchResult$ : Observable<any>;
  private searchText$ = new Subject<string>();
  // Web Socket
  socket: any;

  constructor(
    private discussService :　DiscussService,
    private cookieService : CookieService
  ) { }

  ngOnInit() {
    // Get User Info
    const user = this.cookieService.get('UserID').replace('Token','');
    this.user = user.charAt(0).toUpperCase() + user.slice(1);
    // Search friends
    this.searchResult$ = this.searchText$.pipe(
      debounceTime(1000), // wait for the user to stop typing (1 second in this case)
      distinctUntilChanged(), // wait until the search text changes.
      switchMap(searchVal => 
        this.discussService.getSerchResult(searchVal)
      )
    );
    this.searchResult$.subscribe(data => {
      this.phones = data;
      this.contacts = data;
    });
    /* Conect to WebSocket */
    this.socket = new WebSocket('ws://127.0.0.1:8080', 'echo-protocol');

    // Connection opened
    this.socket.onopen = () => {
      console.log('connect to websocket');
    }

    // Error occured
    this.socket.onerror = (error) => {
      console.log(`Web Socket error: ${error}`);
    }
  }

  changeChat(type){
    this.chattype = type;
    // Initialize contact personlist
    this.messages = [
      {name:'Json', conversation: 'hello', date: '2019/09/05'},
      {name:'Joy', conversation: 'hello', date: '2019/09/05'},
      {name:'Amy', conversation: 'hello', date: '2019/09/05'},
      {name:'Tonal', conversation: 'hello', date: '2019/09/05'}];
    this.phones = [
      {name: 'Json'},
      {name: 'Joy'},
      {name: 'Amy'},
      {name: 'Tonal'},
      {name: 'Joanna'}
    ]
    this.contacts = [
      {name: 'Json'},
      {name: 'Joy'},
      {name: 'Amy'},
      {name: 'Tonal'},
      {name: 'Joanna'}
    ]
  }

  showMessage(name){
    this.discussService.getMessage(name)
      .subscribe((message) => {
        this.personalmessages = message;
      });
  }

  sendMessage(messageTosend: string){
    console.log('messageTosend is =>', messageTosend);
    const sendingMessages = {
      nameId : this.user,
      message : messageTosend
    }
    // If this.socket is connected, sending messages
    this.socket.send(JSON.stringify(sendingMessages));

    // Error occured
    this.socket.onerror = (error) => {
      console.log(`WebSocket error : ${error}`);
    }

    // Listen for messages
    this.socket.onmessage = (event) => {
      console.log('Received data from server is =>', event.data);
      let receivedMsg = JSON.parse(event.data);
      console.log('receivedMsg.name is =>', receivedMsg.nameId);
      if(receivedMsg.nameId == this.user){
        this.personalmessages.push({name: 'me', message: receivedMsg.message });
      } else if (receivedMsg.name != this.user){
        this.personalmessages.push({name: 'other', message: receivedMsg.message});
      }
    }
  }

  onKey(searchVal: string){
    this.searchText$.next(searchVal);
  }
}

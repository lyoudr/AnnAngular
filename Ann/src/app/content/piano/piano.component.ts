import { Component, OnInit } from '@angular/core';
import { PianoService } from 'src/app/services/piano.service';
import WOW from 'wow.js';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss']
})
export class PianoComponent implements OnInit {
  musictype: Array<any> = ['Classic', 'Morden', 'Jazz', 'Movie', 'Cartoon'];
  typeindex: number;
  classTitle: string = '';
  pieces: Array<any> = [{
      'name':'Mozart',
      'sheetname': 'good',
      'src':'',
      'price': 280
  },{
      'name':'Beethovan',
      'sheetname': 'moon',
      'src':'',
      'price': 350
  },{
      'name':'Chopin',
      'sheetname': 'hi',
      'src':'',
      'price': 500
  },{
    'name':'Johann',
    'sheetname': 'fight',
    'src':'',
    'price': 375
  },{
    'name':'Liszt',
    'sheetname': 'snow',
    'src':'',
    'price': 450
  },{
    'name':'Robert',
    'sheetname': 'spring',
    'src':'',
    'price': 390
  }];
  ranktype: string = 'name';
  currencyCode: string = 'TWD';
  isSlideUp: boolean = false;

  constructor(
    public pianoService: PianoService
  ) { }

  ngOnInit() {
    new WOW().init();
  }

  selectMusic(musicindex){
    this.typeindex = musicindex;
    this.classTitle = this.musictype[musicindex];
    if(this.isSlideUp === false) {
      this.isSlideUp = true;
    }
  }

  rankPieces(ranktype){
    this.ranktype = ranktype;
  }

  setCurrency(currency){
    this.currencyCode = currency;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss']
})
export class PianoComponent implements OnInit {
  musictype: Array<any> = ['classic', 'morden', 'jazz', 'movie', 'cartoon'];
  typeindex: number;

  constructor() { }

  ngOnInit() {
  }

  selectMusic(musicindex){
    this.typeindex = musicindex;
  }
}

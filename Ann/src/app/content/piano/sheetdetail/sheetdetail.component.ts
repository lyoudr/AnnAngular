import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sheetdetail',
  templateUrl: './sheetdetail.component.html',
  styleUrls: ['./sheetdetail.component.scss']
})
export class SheetdetailComponent implements OnInit {
  id: string ;
  pdfSrc: string;
  audioSrc: string;
  page: number = 1;
  originalsize : boolean = false;
  fittopage: boolean = true;


  constructor(
    private router : ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    this.pdfSrc = `http://127.0.0.1:4500/assets/pdf/${this.id}.pdf`;
    this.audioSrc = `http://127.0.0.1:4500/assets/music/${this.id}.mp3`;
  }

  selectPage(count){
    this.page = this.page + count;
  }
}

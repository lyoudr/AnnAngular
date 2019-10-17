import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PianoService } from '../../../services/piano.service';
import { DomSanitizer } from '@angular/platform-browser';
import WOW from 'wow.js';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit, OnChanges {
  sheet$: Observable<any>;
  blob: any;
  pdflink: any;

  @Input() title : string; 
  @Input() musictype: string;
  sheets: Array<any>;
  isDetail : boolean = false; // decide if is enter to detail page
  url: Observable<string>;

  constructor(
    public pianoService: PianoService,
    private sanitizer: DomSanitizer
  ) { 
  }

  ngOnInit() {
    new WOW().init();
    this.pianoService.detectNavigation('/piano');
  }

  ngOnChanges(){
    console.log('this.musictype is =>', this.musictype);
    // 根據傳入的 musictype，跟後端索取 pdf file
    this.pianoService.getmusicsheet(this.musictype)
      .subscribe((pdfs: Array<string>) => {
        console.log('returned pdfs is =>', pdfs);
        this.sheets = pdfs.map((eachname) => {
          return { 
            url: this.sanitizer.bypassSecurityTrustResourceUrl(`assets/pdf/${eachname}.pdf`),
            name: eachname  
          };
        });
      });
  }
}

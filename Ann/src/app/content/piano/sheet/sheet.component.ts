import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PianoService } from '../../../services/piano.service';
import { DomSanitizer } from '@angular/platform-browser';
//import { switchMap } from 'rxjs/operators';


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

  constructor(
    private route: ActivatedRoute,
    private pianoService: PianoService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    /*this.sheet$ = this.route.paramMap.pipe(
      switchMap(params => {
        const sheettype = params.get('id');
        return this.pianoService.getsheet(sheettype)
      })
    );
    // 訂閱此 Observable
    this.sheet$.subscribe((sheet) => {
      console.log('sheet is =>', sheet);
      this.blob = new Blob([sheet], {type: 'application/pdf'});
      var downloadURL = window.URL.createObjectURL(sheet);
      this.pdflink = this.sanitizer.bypassSecurityTrustUrl(downloadURL);
      console.log('this.pdflink is =>', this.pdflink);
    });*/
  }

  ngOnChanges(){
    console.log('this.musictype is =>', this.musictype);
    // 根據傳入的 musictype，跟後端索取 pdf file
    this.pianoService.getmusicsheet(this.musictype)
      .subscribe((pdfs: Array<string>) => {
        console.log('returned pdfs is =>', pdfs);
        this.sheets = pdfs.map((eachname) => {
          return this.sanitizer.bypassSecurityTrustResourceUrl(`assets/pdf/${eachname}.pdf`);
        });
      });
  }
}

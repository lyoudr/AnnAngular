import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PianoService } from '../../../services/piano.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {
  sheet$: Observable<any>;
  blob: any;
  pdflink: any;

  constructor(
    private route: ActivatedRoute,
    private pianoService: PianoService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.sheet$ = this.route.paramMap.pipe(
      switchMap(params => {
        const sheettype = params.get('id');
        return this.pianoService.getsheet(sheettype)
      })
    );
    // 訂閱此 Observable
    this.sheet$.subscribe((sheet) => {
      /*this.blob = new Blob([sheet], {type: 'application/pdf'});
      var downloadURL = window.URL.createObjectURL(sheet);
      let link = this.sanitizer.bypassSecurityTrustUrl(downloadURL);
      this.pdflink = link['changingThisBreaksApplicationSecurity'];
      console.log('this.pdflink is =>', this.pdflink);*/
    });
  }

}

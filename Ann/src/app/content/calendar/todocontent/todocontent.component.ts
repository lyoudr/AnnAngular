import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dalog';

@Component({
  selector: 'app-todocontent',
  templateUrl: './todocontent.component.html',
  styleUrls: ['./todocontent.component.scss']
})
export class TodocontentComponent implements OnInit {

  constructor(
    public dialogRef : MatDialogRef<TodocontentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

}

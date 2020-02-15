import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dalog';
import { TodocontentComponent } from '../todocontent/todocontent.component';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.scss']
})
export class TodoitemComponent implements OnInit {
  todolists: any = [];
  todocontent: any;
  color: any;
  colorlists: any = [];

  constructor(
    public dialogRef: MatDialogRef<TodoitemComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  add(): void {
    const dialogchildRef = this.dialog.open(TodocontentComponent, {
      width: '500px',
      height: '400px',
      data: {todolists: this.todolists, todocontent: this.todocontent, color: this.color}
    });

    dialogchildRef.afterClosed().subscribe(result => {
      this.todolists.push({title: result[0], content: result[1], color: result[2]});
    });
  }
}

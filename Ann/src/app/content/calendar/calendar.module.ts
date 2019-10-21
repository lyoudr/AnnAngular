import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar.component';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TodocontentComponent } from './todocontent/todocontent.component';
import { TodoitemComponent } from './todoitem/todoitem.component';

@NgModule({
  declarations: [
    CalendarComponent,
    TodocontentComponent,
    TodoitemComponent
  ],
  entryComponents: [
    TodocontentComponent,
    TodoitemComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CalendarModule { }

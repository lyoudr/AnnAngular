import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() detail : any;
  @Output() close :EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log('modal detail is =>', this.detail);
  }
  
  closeModal(){
    this.close.emit(true);
  }
}

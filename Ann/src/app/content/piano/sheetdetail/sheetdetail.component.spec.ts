import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetdetailComponent } from './sheetdetail.component';

describe('SheetdetailComponent', () => {
  let component: SheetdetailComponent;
  let fixture: ComponentFixture<SheetdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

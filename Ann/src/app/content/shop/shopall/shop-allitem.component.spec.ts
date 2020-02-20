import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAllitemComponent } from './shop-allitem.component';

describe('ShopAllitemComponent', () => {
  let component: ShopAllitemComponent;
  let fixture: ComponentFixture<ShopAllitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAllitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAllitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

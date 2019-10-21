import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodocontentComponent } from './todocontent.component';

describe('TodocontentComponent', () => {
  let component: TodocontentComponent;
  let fixture: ComponentFixture<TodocontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodocontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodocontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

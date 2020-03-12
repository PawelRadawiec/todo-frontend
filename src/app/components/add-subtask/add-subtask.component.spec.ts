import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubtaskComponent } from './add-subtask.component';

describe('AddSubtaskComponent', () => {
  let component: AddSubtaskComponent;
  let fixture: ComponentFixture<AddSubtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

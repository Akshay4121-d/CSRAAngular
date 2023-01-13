import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatebillComponent } from './duplicatebill.component';

describe('DuplicatebillComponent', () => {
  let component: DuplicatebillComponent;
  let fixture: ComponentFixture<DuplicatebillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicatebillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

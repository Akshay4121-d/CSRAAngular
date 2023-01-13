import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatebillcontactComponent } from './duplicatebillcontact.component';

describe('DuplicatebillcontactComponent', () => {
  let component: DuplicatebillcontactComponent;
  let fixture: ComponentFixture<DuplicatebillcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicatebillcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatebillcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatepolicycontactComponent } from './duplicatepolicycontact.component';

describe('DuplicatepolicycontactComponent', () => {
  let component: DuplicatepolicycontactComponent;
  let fixture: ComponentFixture<DuplicatepolicycontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicatepolicycontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatepolicycontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

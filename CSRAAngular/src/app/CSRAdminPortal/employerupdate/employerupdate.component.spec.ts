import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerupdateComponent } from './employerupdate.component';

describe('EmployerupdateComponent', () => {
  let component: EmployerupdateComponent;
  let fixture: ComponentFixture<EmployerupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

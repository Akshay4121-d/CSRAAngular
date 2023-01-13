import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerresultComponent } from './employerresult.component';

describe('EmployerresultComponent', () => {
  let component: EmployerresultComponent;
  let fixture: ComponentFixture<EmployerresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

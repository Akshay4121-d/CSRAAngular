import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersearchComponent } from './employersearch.component';

describe('EmployersearchComponent', () => {
  let component: EmployersearchComponent;
  let fixture: ComponentFixture<EmployersearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployersearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

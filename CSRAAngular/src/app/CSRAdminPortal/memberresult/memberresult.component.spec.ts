import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberresultComponent } from './memberresult.component';

describe('MemberresultComponent', () => {
  let component: MemberresultComponent;
  let fixture: ComponentFixture<MemberresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimdetailsComponent } from './claimdetails.component';

describe('ClaiminterfacemockupComponent', () => {
  let component: ClaimdetailsComponent;
  let fixture: ComponentFixture<ClaimdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

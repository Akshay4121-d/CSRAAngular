import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaiminforesultComponent } from './claiminforesult.component';

describe('ClaiminforesultComponent', () => {
  let component: ClaiminforesultComponent;
  let fixture: ComponentFixture<ClaiminforesultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaiminforesultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaiminforesultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

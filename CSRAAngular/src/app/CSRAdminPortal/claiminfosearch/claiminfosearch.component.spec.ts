import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaiminfosearchComponent } from './claiminfosearch.component';

describe('ClaiminfosearchComponent', () => {
  let component: ClaiminfosearchComponent;
  let fixture: ComponentFixture<ClaiminfosearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaiminfosearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaiminfosearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

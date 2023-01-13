import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerinfodetailedComponent } from './brokerinfodetailed.component';

describe('BrokerinfodetailedComponent', () => {
  let component: BrokerinfodetailedComponent;
  let fixture: ComponentFixture<BrokerinfodetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerinfodetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerinfodetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

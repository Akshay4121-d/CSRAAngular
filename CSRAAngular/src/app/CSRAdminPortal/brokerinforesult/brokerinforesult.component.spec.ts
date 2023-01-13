import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerinforesultComponent } from './brokerinforesult.component';

describe('BrokerinforesultComponent', () => {
  let component: BrokerinforesultComponent;
  let fixture: ComponentFixture<BrokerinforesultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerinforesultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerinforesultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerinfosearchComponent } from './brokerinfosearch.component';

describe('BrokerinfosearchComponent', () => {
  let component: BrokerinfosearchComponent;
  let fixture: ComponentFixture<BrokerinfosearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerinfosearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerinfosearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

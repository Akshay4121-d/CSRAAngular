import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersearchComponent } from './producersearch.component';

describe('ProducersearchComponent', () => {
  let component: ProducersearchComponent;
  let fixture: ComponentFixture<ProducersearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducersearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

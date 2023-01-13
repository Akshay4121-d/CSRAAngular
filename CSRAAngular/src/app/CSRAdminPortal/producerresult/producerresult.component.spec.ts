import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerresultComponent } from './producerresult.component';

describe('ProducerresultComponent', () => {
  let component: ProducerresultComponent;
  let fixture: ComponentFixture<ProducerresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

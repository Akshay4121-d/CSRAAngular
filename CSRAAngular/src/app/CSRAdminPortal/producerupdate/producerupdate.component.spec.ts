import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerupdateComponent } from './producerupdate.component';

describe('ProducerupdateComponent', () => {
  let component: ProducerupdateComponent;
  let fixture: ComponentFixture<ProducerupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

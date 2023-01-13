import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatepolicyComponent } from './duplicatepolicy.component';

describe('DuplicatepolicyComponent', () => {
  let component: DuplicatepolicyComponent;
  let fixture: ComponentFixture<DuplicatepolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicatepolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

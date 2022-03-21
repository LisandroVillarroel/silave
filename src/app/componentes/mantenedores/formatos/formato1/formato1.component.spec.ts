import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Formato1Component } from './formato1.component';

describe('Formato1Component', () => {
  let component: Formato1Component;
  let fixture: ComponentFixture<Formato1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Formato1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Formato1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

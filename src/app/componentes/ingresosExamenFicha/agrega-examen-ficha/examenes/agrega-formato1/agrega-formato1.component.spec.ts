import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaFormato1Component } from './agrega-formato1.component';

describe('AgregaFormato1Component', () => {
  let component: AgregaFormato1Component;
  let fixture: ComponentFixture<AgregaFormato1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaFormato1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaFormato1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaFormato1Component } from './consulta-formato1.component';

describe('ConsultaFormato1Component', () => {
  let component: ConsultaFormato1Component;
  let fixture: ComponentFixture<ConsultaFormato1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaFormato1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaFormato1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaFormato1Component } from './elimina-formato1.component';

describe('EliminaFormato1Component', () => {
  let component: EliminaFormato1Component;
  let fixture: ComponentFixture<EliminaFormato1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminaFormato1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaFormato1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

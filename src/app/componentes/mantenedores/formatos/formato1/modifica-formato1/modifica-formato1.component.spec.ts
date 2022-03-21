import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaFormato1Component } from './modifica-formato1.component';

describe('ModificaFormato1Component', () => {
  let component: ModificaFormato1Component;
  let fixture: ComponentFixture<ModificaFormato1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaFormato1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaFormato1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

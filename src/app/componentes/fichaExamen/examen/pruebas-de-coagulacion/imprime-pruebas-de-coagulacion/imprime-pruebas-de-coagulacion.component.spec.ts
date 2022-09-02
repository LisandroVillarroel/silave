import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimePruebasDeCoagulacionComponent } from './imprime-pruebas-de-coagulacion.component';

describe('ImprimePruebasDeCoagulacionComponent', () => {
  let component: ImprimePruebasDeCoagulacionComponent;
  let fixture: ComponentFixture<ImprimePruebasDeCoagulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimePruebasDeCoagulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimePruebasDeCoagulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

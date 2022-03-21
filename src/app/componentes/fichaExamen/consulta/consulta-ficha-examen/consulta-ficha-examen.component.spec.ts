import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaFichaExamenComponent } from './consulta-ficha-examen.component';

describe('ConsultaFichaExamenComponent', () => {
  let component: ConsultaFichaExamenComponent;
  let fixture: ComponentFixture<ConsultaFichaExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaFichaExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaFichaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

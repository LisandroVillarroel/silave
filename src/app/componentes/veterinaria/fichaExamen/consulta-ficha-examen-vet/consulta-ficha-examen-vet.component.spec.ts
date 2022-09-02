import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaFichaExamenVetComponent } from './consulta-ficha-examen-vet.component';

describe('ConsultaFichaExamenVetComponent', () => {
  let component: ConsultaFichaExamenVetComponent;
  let fixture: ComponentFixture<ConsultaFichaExamenVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaFichaExamenVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaFichaExamenVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

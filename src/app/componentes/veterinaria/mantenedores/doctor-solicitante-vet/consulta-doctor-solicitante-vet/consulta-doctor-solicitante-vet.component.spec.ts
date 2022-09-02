import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDoctorSolicitanteVetComponent } from './consulta-doctor-solicitante-vet.component';

describe('ConsultaDoctorSolicitanteVetComponent', () => {
  let component: ConsultaDoctorSolicitanteVetComponent;
  let fixture: ComponentFixture<ConsultaDoctorSolicitanteVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDoctorSolicitanteVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDoctorSolicitanteVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

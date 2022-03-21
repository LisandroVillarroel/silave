import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDoctorSolicitanteComponent } from './consulta-doctor-solicitante.component';

describe('ConsultaDoctorSolicitanteComponent', () => {
  let component: ConsultaDoctorSolicitanteComponent;
  let fixture: ComponentFixture<ConsultaDoctorSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDoctorSolicitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDoctorSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

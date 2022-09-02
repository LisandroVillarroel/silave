import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaDoctorSolicitanteVetComponent } from './agrega-doctor-solicitante-vet.component';

describe('AgregaDoctorSolicitanteVetComponent', () => {
  let component: AgregaDoctorSolicitanteVetComponent;
  let fixture: ComponentFixture<AgregaDoctorSolicitanteVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaDoctorSolicitanteVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaDoctorSolicitanteVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

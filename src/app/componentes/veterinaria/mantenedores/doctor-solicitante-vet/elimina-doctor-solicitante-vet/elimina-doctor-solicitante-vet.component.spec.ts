import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaDoctorSolicitanteVetComponent } from './elimina-doctor-solicitante-vet.component';

describe('EliminaDoctorSolicitanteVetComponent', () => {
  let component: EliminaDoctorSolicitanteVetComponent;
  let fixture: ComponentFixture<EliminaDoctorSolicitanteVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaDoctorSolicitanteVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaDoctorSolicitanteVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

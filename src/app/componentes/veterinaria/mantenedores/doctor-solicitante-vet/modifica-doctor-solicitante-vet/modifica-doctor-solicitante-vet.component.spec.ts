import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaDoctorSolicitanteVetComponent } from './modifica-doctor-solicitante-vet.component';

describe('ModificaDoctorSolicitanteVetComponent', () => {
  let component: ModificaDoctorSolicitanteVetComponent;
  let fixture: ComponentFixture<ModificaDoctorSolicitanteVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaDoctorSolicitanteVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaDoctorSolicitanteVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaDoctorSolicitanteComponent } from './modifica-doctor-solicitante.component';

describe('ModificaDoctorSolicitanteComponent', () => {
  let component: ModificaDoctorSolicitanteComponent;
  let fixture: ComponentFixture<ModificaDoctorSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaDoctorSolicitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaDoctorSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

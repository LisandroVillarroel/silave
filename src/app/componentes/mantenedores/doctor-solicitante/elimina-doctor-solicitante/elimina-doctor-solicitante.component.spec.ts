import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaDoctorSolicitanteComponent } from './elimina-doctor-solicitante.component';

describe('EliminaDoctorSolicitanteComponent', () => {
  let component: EliminaDoctorSolicitanteComponent;
  let fixture: ComponentFixture<EliminaDoctorSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaDoctorSolicitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaDoctorSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaDoctorSolicitanteComponent } from './agrega-doctor-solicitante.component';

describe('AgregaDoctorSolicitanteComponent', () => {
  let component: AgregaDoctorSolicitanteComponent;
  let fixture: ComponentFixture<AgregaDoctorSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaDoctorSolicitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaDoctorSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

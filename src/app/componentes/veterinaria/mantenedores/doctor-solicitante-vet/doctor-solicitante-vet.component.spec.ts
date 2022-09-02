import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSolicitanteVetComponent } from './doctor-solicitante-vet.component';

describe('DoctorSolicitanteVetComponent', () => {
  let component: DoctorSolicitanteVetComponent;
  let fixture: ComponentFixture<DoctorSolicitanteVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSolicitanteVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSolicitanteVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

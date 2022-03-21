import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSolicitanteComponent } from './doctor-solicitante.component';

describe('DoctorSolicitanteComponent', () => {
  let component: DoctorSolicitanteComponent;
  let fixture: ComponentFixture<DoctorSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSolicitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

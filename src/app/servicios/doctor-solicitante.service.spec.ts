import { TestBed } from '@angular/core/testing';

import { DoctorSolicitanteService } from './doctor-solicitante.service';

describe('DoctorSolicitanteService', () => {
  let service: DoctorSolicitanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorSolicitanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

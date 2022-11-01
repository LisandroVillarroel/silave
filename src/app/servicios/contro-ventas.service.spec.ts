import { TestBed } from '@angular/core/testing';

import { ControVentasService } from './contro-ventas.service';

describe('ControVentasService', () => {
  let service: ControVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

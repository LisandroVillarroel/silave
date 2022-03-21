import { TestBed } from '@angular/core/testing';

import { UsuarioLabService } from './usuario-lab.service';

describe('UsuarioLabService', () => {
  let service: UsuarioLabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioLabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

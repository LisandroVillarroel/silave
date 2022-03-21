import { TestBed } from '@angular/core/testing';

import { Formato1Service } from './formato1.service';

describe('Formato1Service', () => {
  let service: Formato1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Formato1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

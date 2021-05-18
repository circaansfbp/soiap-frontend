import { TestBed } from '@angular/core/testing';

import { FichaTratamientoService } from './ficha-tratamiento.service';

describe('FichaTratamientoService', () => {
  let service: FichaTratamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaTratamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

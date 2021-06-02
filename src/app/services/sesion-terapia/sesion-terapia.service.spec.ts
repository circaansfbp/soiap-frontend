import { TestBed } from '@angular/core/testing';

import { SesionTerapiaService } from './sesion-terapia.service';

describe('SesionTerapiaService', () => {
  let service: SesionTerapiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionTerapiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DictadoService } from './dictado.service';

describe('DictadoService', () => {
  let service: DictadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DatosEventosService } from './datos-eventos.service';

describe('DatosEventosService', () => {
  let service: DatosEventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosEventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

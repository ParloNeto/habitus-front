import { TestBed } from '@angular/core/testing';

import { TipoObjetivoService } from './tipo-objetivo.service';

describe('TipoObjetivoService', () => {
  let service: TipoObjetivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoObjetivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

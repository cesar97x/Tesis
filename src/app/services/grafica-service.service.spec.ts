import { TestBed } from '@angular/core/testing';

import { GraficaServiceService } from './grafica-service.service';

describe('GraficaServiceService', () => {
  let service: GraficaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

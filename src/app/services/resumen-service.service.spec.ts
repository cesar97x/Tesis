import { TestBed } from '@angular/core/testing';

import { ResumenServiceService } from './resumen-service.service';

describe('ResumenServiceService', () => {
  let service: ResumenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

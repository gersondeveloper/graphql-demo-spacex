import { TestBed } from '@angular/core/testing';

import { LauchesService } from './launches.service';

describe('LauchesService', () => {
  let service: LauchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LauchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

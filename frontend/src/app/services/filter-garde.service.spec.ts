import { TestBed } from '@angular/core/testing';

import { FilterGardeService } from './filter-garde.service';

describe('FilterGardeService', () => {
  let service: FilterGardeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterGardeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ContenuInformatifService } from './contenu-informatif.service';

describe('ContenuInformatifService', () => {
  let service: ContenuInformatifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContenuInformatifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

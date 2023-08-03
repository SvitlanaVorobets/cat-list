import { TestBed } from '@angular/core/testing';

import { CatListService } from './cat-list.service';

describe('CatListService', () => {
  let service: CatListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ViewpageService } from './viewpage.service';

describe('ViewpageService', () => {
  let service: ViewpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

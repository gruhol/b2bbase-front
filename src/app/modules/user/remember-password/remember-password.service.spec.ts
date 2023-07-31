import { TestBed } from '@angular/core/testing';

import { RememberPasswordService } from './remember-password.service';

describe('RememberPasswordService', () => {
  let service: RememberPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RememberPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SendPasswordService } from './send-password.service';

describe('SendPasswordService', () => {
  let service: SendPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LinkveryficationService } from './linkveryfication.service';

describe('LinkveryficationService', () => {
  let service: LinkveryficationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkveryficationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

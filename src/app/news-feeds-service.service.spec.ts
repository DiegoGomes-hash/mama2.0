import { TestBed } from '@angular/core/testing';

import { NewsFeedsServiceService } from './news-feeds-service.service';

describe('NewsFeedsServiceService', () => {
  let service: NewsFeedsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsFeedsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

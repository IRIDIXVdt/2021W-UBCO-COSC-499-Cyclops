import { TestBed } from '@angular/core/testing';

import { FeedbackDetailsGuard } from './feedback-details.guard';

describe('FeedbackDetailsGuard', () => {
  let guard: FeedbackDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FeedbackDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

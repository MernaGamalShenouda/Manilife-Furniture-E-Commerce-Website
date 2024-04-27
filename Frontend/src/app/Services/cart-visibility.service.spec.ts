import { TestBed } from '@angular/core/testing';

import { CartVisibilityService } from './cart-visibility.service';

describe('CartVisibilityService', () => {
  let service: CartVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

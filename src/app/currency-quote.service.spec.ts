import { TestBed } from '@angular/core/testing';

import { CurrencyQuoteService } from './currency-quote.service';

describe('CurrencyQuoteService', () => {
  let service: CurrencyQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

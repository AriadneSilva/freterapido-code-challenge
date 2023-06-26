import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyQuoteService } from './currency-quote.service';

describe('CurrencyQuoteService', () => {
  let service: CurrencyQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CurrencyQuoteService);
  });

  it('should be created', () => {
    const service: CurrencyQuoteService = TestBed.get(CurrencyQuoteService);
    expect(service).toBeTruthy();
  });
});

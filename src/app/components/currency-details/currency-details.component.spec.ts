import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyDetailsComponent } from './currency-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyQuoteService } from 'src/app/currency-quote.service';

describe('CurrencyDetailsComponent', () => {
  let component: CurrencyDetailsComponent;
  let fixture: ComponentFixture<CurrencyDetailsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyQuoteService],
      declarations: [CurrencyDetailsComponent],
    });
    fixture = TestBed.createComponent(CurrencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created', () => {
    const service: CurrencyQuoteService = TestBed.get(CurrencyQuoteService);
    expect(service).toBeTruthy();
  });

  it('should have getCurrencyDataSet function', () => {
    const service: CurrencyQuoteService = TestBed.get(CurrencyQuoteService);
    expect(service.getCurrencyDataSet).toBeTruthy();
  });

  it('should have getCurrencyDataByName function', () => {
    const service: CurrencyQuoteService = TestBed.get(CurrencyQuoteService);
    expect(service.getCurrencyDataByName('CAD-BRL')).toBeTruthy();
  });
});

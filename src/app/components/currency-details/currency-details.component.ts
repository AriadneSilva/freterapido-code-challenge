import { catchError } from 'rxjs/operators';
import { CurrencyData } from '../../currency-data';
import { Component, OnInit } from '@angular/core';
import { CurrencyQuoteService } from '../../currency-quote.service';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css'],
})
export class CurrencyDetailsComponent implements OnInit {
  currencyDataSet: CurrencyData[] = [];
  logo: string = 'assets/loader.svg';

  constructor(private currencyService: CurrencyQuoteService) {}

  ngOnInit(): void {
    let dataCache = localStorage.getItem('arrayCurrencyData');
    dataCache === null
      ? this.fillCurrencyDataSet()
      : (this.currencyDataSet = JSON.parse(dataCache));
  }

  public async fillCurrencyDataSet(): Promise<void> {
    try {
      await this.currencyService.getCurrencyDataSet().subscribe((data) => {
        Object.values(data).map((item) => {
          item.updateDate = new Date().toLocaleTimeString();
        });

        this.currencyDataSet = Object.values(data);
        localStorage.setItem(
          'arrayCurrencyData',
          JSON.stringify(this.currencyDataSet)
        );
      });
    } catch (e) {
      console.log('Erro ao buscar os dados', e);
    }
  }

  public realoadDataSet = async (): Promise<void> => {
    for (let index = 0; index < this.currencyDataSet.length; index++) {
      if (!this.currencyDataSet[index].isError) {
        this.updateDataCurrency(index);
      }
    }
  };

  updateDataCurrency(index: any): void {
    this.currencyDataSet[index].isUpdate = true;
    this.currencyDataSet[index].isError = false;
    this.currencyService
      .getCurrencyDataByName(
        this.currencyDataSet[index].code +
          '-' +
          this.currencyDataSet[index].codein
      )
      .pipe(
        catchError(() => {
          this.currencyDataSet[index].isUpdate = false;
          this.currencyDataSet[index].isError = true;
          return '';
        })
      )
      .subscribe((data) => {
        let newData: CurrencyData[] = [];
        newData = Object.values(data);
        newData[0].updateDate = new Date().toLocaleTimeString();
        this.currencyDataSet[index] = newData[0];
        this.currencyDataSet[index].isUpdate = false;
      });
  }
  reloadDataError(index: any): void {
    this.updateDataCurrency(index);
  }

  timerId = setInterval(() => {
    this.realoadDataSet();
    localStorage.removeItem('arrayCurrencyData');
  }, 180000);
}


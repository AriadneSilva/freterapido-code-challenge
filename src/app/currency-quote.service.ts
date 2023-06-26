import { Injectable } from '@angular/core';
import { CurrencyData } from './currency-data';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyQuoteService {
  private currencyQuoteUrl = 'https://economia.awesomeapi.com.br';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getCurrencyDataSet(): Observable<CurrencyData[]> {
    const url = `${this.currencyQuoteUrl}/last/CAD-BRL,ARS-BRL,GBP-BRL`;
    return this.http
      .get<CurrencyData[]>(url, this.httpOptions)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  getCurrencyDataByName(name: string): Observable<CurrencyData> {
    const url = `${this.currencyQuoteUrl}/last/${name}`;
    return this.http
      .get<CurrencyData>(url, this.httpOptions)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  private httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(
        'A client side error occurs. The error message is ' + error.message
      );
    } else {
      console.error(
        'An error happened in server. The HTTP status code is ' +
          error.status +
          ' and the error returned is ' +
          error.message
      );
    }

    return throwError('Error occurred. Pleas try again');
  }
}

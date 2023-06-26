import { CurrencyQuoteService } from './currency-quote.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CurrencyDetailsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [CurrencyQuoteService],
  bootstrap: [AppComponent],
})
export class AppModule {}

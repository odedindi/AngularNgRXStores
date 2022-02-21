import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { currency } from 'src/app/stores';

import type { Currency } from 'src/app/types/currency.interface';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
})
export class CurrencyComponent {
  public currencies$: Observable<Currency[]>;

  constructor(private store: Store<{ currencies: Currency[] }>) {
    // two possible syntaxes
    this.currencies$ = this.store.select((state) => state.currencies);
    // this.currencies$ = store.select('currencies');
  }

  public removeCurrency = ({ name }: Currency) =>
    this.store.dispatch(currency.actions.removeCurrency({ name }));
}

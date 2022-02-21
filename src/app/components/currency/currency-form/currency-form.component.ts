import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { currency } from 'src/app/stores';

import { Currency } from 'src/app/types/currency.interface';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
})
export class CurrencyFormComponent {
  public form: FormGroup;

  constructor(
    private store: Store<{ currencies: Currency[] }>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      value: new FormControl(null, [Validators.required]),
    });
  }

  public addCurrency = (name: string, value: number) =>
    this.store.dispatch(currency.actions.addCurrency({ name, value }));

  public reset = () => this.store.dispatch(currency.actions.reset());
}

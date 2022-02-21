import { Action, createAction, createReducer, on, props } from '@ngrx/store';

import { Currency } from '../types/currency.interface';

// actions
const addCurrency = createAction('[Currencies] AddCurrency', props<Currency>());
const removeCurrency = createAction(
  '[Currencies] removeCurrency',
  props<{ name: string }>()
);
const reset = createAction('[Currencies] Reset');
const actions = { removeCurrency, addCurrency, reset };

// initial state
const initialState: Currency[] = [{ name: 'Swiss Franc', value: 1 }];

// reducer
const _currencyReducer = createReducer(
  initialState,
  on(actions.addCurrency, (state, { name, value }) => [
    ...state,
    { name, value },
  ]),
  on(actions.removeCurrency, (state, payload) =>
    [...state].filter(({ name }) => name !== payload.name)
  ),
  on(actions.reset, (_prevState) => [] as Currency[])
);

const reducer = (state: Currency[] | undefined, action: Action) =>
  _currencyReducer(state, action);

export { actions, reducer, initialState };

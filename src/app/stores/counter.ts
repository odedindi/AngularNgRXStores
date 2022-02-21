import { Action, createAction, createReducer, on } from '@ngrx/store';

// actions
const increment = createAction('[Counter] Increment');
const decrement = createAction('[Counter] Decrement');
const reset = createAction('[Counter] Reset');
const actions = { increment, decrement, reset };

// initial State
const initialState = 7;

// reducer

const _counterReducer = createReducer(
  initialState,
  on(actions.increment, (state) => ++state),
  on(actions.decrement, (state) => --state),
  on(actions.reset, (_state) => 0)
);

const reducer = (state: number | undefined, action: Action) =>
  _counterReducer(state, action);

export { actions, reducer, initialState };

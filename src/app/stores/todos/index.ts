import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import * as actions from './actions';

import { Todo } from '../../types/todo.interface';

// initial state
const initialState: Todo[] = [];

// reducer
const _currencyReducer: ActionReducer<Todo[], Action> = createReducer(
  initialState,
  on(actions.addTodoSuccess, (state, { todo }) => [todo, ...state]),
  on(actions.loadTodosSuccess, (_state, { todos }) => [...todos]),
  on(actions.removeTodoSuccess, (state, { id }) =>
    [...state].filter((todo) => todo.id !== id)
  ),
  on(actions.toggleTodoSuccess, (state, { todo: { completed, id } }) =>
    [...state].map((todo) => (todo.id === id ? { ...todo, completed } : todo))
  ),
  on(actions.updateTodo, (state, { todo: updatedTodo }) =>
    [...state].map((todo) =>
      todo.id === updatedTodo.id ? { ...updatedTodo } : todo
    )
  )
);

const reducer = (state: Todo[] | undefined, action: Action) =>
  _currencyReducer(state, action);

const storekey = 'todos';

export { actions, storekey, reducer, initialState };

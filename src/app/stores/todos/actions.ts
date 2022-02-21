import { createAction, props } from '@ngrx/store';

import { Todo } from 'src/app/types/todo.interface';

// actions

//add
export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ title: Todo['title'] }>()
);
export const addTodoSuccess = createAction(
  '[Todos] Add Todo Success',
  props<{ todo: Todo }>()
);
export const addTodoError = createAction(
  '[Todos] Add Todo Error',
  props<{ err: any }>()
);

//load
export const loadTodos = createAction('[Todos] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosError = createAction(
  '[Todos] Load Todos Error',
  props<{ err: any }>()
);

//remove
export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ id: Todo['id'] }>()
);
export const removeTodoSuccess = createAction(
  '[Todo] Remove Todo Success',
  props<{ id: Todo['id'] }>()
);
export const removeTodoError = createAction(
  '[Todo] Remove Todo Error',
  props<{ err: any }>()
);

// toggle
export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ todo: Todo }>()
);
export const toggleTodoSuccess = createAction(
  '[Todo] Toggle Todo Success',
  props<{ todo: Todo }>()
);
export const toggleTodoError = createAction(
  '[Todo] Toggle Todo Error',
  props<{ err: any }>()
);

//update
export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo }>()
);
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>()
);
export const updateTodoError = createAction(
  '[Todo] Update Todo Error',
  props<{ err: any }>()
);

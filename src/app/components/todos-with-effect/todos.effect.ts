import { Injectable, OnDestroy } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError, tap } from 'rxjs/operators';

import { todos as todosStore } from 'src/app/stores';

import { TodosService } from './todos.service';

@Injectable({
  providedIn: 'root',
})
export class TodosEffect {
  constructor(private actions$: Actions, private todosService: TodosService) {}

  public addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosStore.actions.addTodo),
      exhaustMap(({ title }) =>
        this.todosService
          .addTodo(title)
          .pipe(map((todo) => todosStore.actions.addTodoSuccess({ todo })))
      ),
      tap((v) => console.log('addTodo$ effect: ', v)),
      catchError((err) => of(todosStore.actions.addTodoError({ err })))
    )
  );

  public loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosStore.actions.loadTodos),
      mergeMap(() =>
        this.todosService.getAllByUserId(1).pipe(
          // this.todosService.getAll().pipe( // if want to fetch all todos from the server
          map((todos) => todosStore.actions.loadTodosSuccess({ todos })),
          catchError((err) => of(todosStore.actions.loadTodosError({ err })))
        )
      )
    )
  );

  public removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosStore.actions.removeTodo),
      tap((v) => console.log('removeTodo$ effect: ', v)),
      exhaustMap(({ id }) =>
        this.todosService
          .removeTodo(id)
          .pipe(map(() => todosStore.actions.removeTodoSuccess({ id })))
      ),
      catchError((err) => of(todosStore.actions.removeTodoError({ err })))
    )
  );

  public toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosStore.actions.toggleTodo),
      exhaustMap(({ todo }) =>
        this.todosService
          .toggleTodo(todo)
          .pipe(map((todo) => todosStore.actions.toggleTodoSuccess({ todo })))
      ),
      tap((v) => console.log('toggleTodo$ effect: ', v)),
      catchError((err) => of(todosStore.actions.toggleTodoError({ err })))
    )
  );

  public updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosStore.actions.updateTodo),
      exhaustMap(({ todo }) =>
        this.todosService
          .updateTodo(todo)
          .pipe(map((todo) => todosStore.actions.updateTodoSuccess({ todo })))
      ),
      tap((v) => console.log('updateTodo$ effect: ', v)),
      catchError((err) => of(todosStore.actions.updateTodoError({ err })))
    )
  );
}

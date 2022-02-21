import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { todos } from 'src/app/stores';

import { Observable } from 'rxjs';

import { TodosService } from './todos.service';

import type { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-with-effect',
  styleUrls: ['./todos-with-effect.component.scss'],
  template: `
    <section class="card p-3">
      <table class="table table-hover text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Todo</th>
            <th scope="col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="theadIcon"
              >
                <path
                  d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                />
              </svg>
            </th>
            <th scope="col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="theadIcon"
              >
                <path
                  d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody *ngFor="let todo of todos$ | async">
          <tr>
            <th scope="row">{{ todo.id }}</th>

            <td
              class="todo text-center"
              [class.checked]="todo.completed"
              (dblclick)="startEditing(todo.id)"
            >
              <label
                (dblclick)="startEditing(todo.id)"
                *ngIf="editingId !== todo.id"
                >{{ todo.title }}</label
              >
              <input
                #editTodo
                *ngIf="editingId === todo.id"
                [value]="todo.title"
                (keyup.enter)="edit(todo, editTodo.value)"
                (keyup.escape)="cancelEditing()"
                (blur)="edit(todo, editTodo.value)"
                class="form-control"
                width="100%"
              />
            </td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="check"
                [class.checked]="todo.completed"
                (click)="toggle(todo)"
              >
                <path
                  d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                />
              </svg>
            </td>
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="trashCan"
                (click)="remove(todo.id)"
              >
                <path
                  d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
})
export class TodosWithEffectComponent implements OnInit {
  public todos$: Observable<Todo[]> = this.store.select((state) => state.todos);

  constructor(private store: Store<{ todos: Todo[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(todos.actions.loadTodos());
  }

  public editingId: number | undefined;

  public startEditing = (id: Todo['id']) => (this.editingId = id);
  public cancelEditing = () => (this.editingId = undefined);
  public edit = (oldTodo: Todo, newTitle: string) => {
    this.editingId = undefined;

    newTitle.trim().length
      ? this.update({ ...oldTodo, title: newTitle })
      : this.remove(oldTodo.id);
  };

  public remove = (id: Todo['id']) =>
    this.store.dispatch(todos.actions.removeTodo({ id }));

  public toggle = (oldTodo: Todo) => {
    const newTodo = { ...oldTodo, completed: !oldTodo.completed };
    this.store.dispatch(todos.actions.toggleTodo({ todo: newTodo }));
  };

  public update = (todo: Todo) =>
    this.store.dispatch(todos.actions.updateTodo({ todo }));
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { todos } from 'src/app/stores';

import type { Todo } from 'src/app/types/todo.interface';

@Component({
  selector: 'app-new-todo-form',
  template: `<section class="card">
    <app-accordion title="New Todo">
      <form [formGroup]="form" novalidate (onsubmit)="addTodo()">
        <section class="row">
          <section class="col-11 p-0 m-0">
            <section class="form-group form-floating m-1">
              <input
                type="text"
                class="form-control"
                formControlName="title"
                required
                #title
                style="padding: 4rem;"
              />
              <label [for]="title">What's on your mind?</label>
            </section>
          </section>
          <section class="col-1 p-0 m-0">
            <button
              (click)="addTodo()"
              [disabled]="form.pristine || form.invalid"
              class="btn btn-success text-center"
              style="width: 100%; height:100%"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 16 16"
                style="enable-background: new 0 0 16 16"
                xml:space="preserve"
              >
                <g>
                  <path
                    class="fill"
                    d="M16,8c0,0.5-0.5,1-1,1H9v6c0,0.5-0.5,1-1,1s-1-0.5-1-1V9H1C0.5,9,0,8.5,0,8s0.5-1,1-1h6V1c0-0.5,0.5-1,1-1s1,0.5,1,1v6h6C15.5,7,16,7.5,16,8z"
                  />
                </g>
              </svg>
            </button>
          </section>
        </section>
      </form>
    </app-accordion>
  </section> `,
})
export class NewTodoFormComponent {
  public form: FormGroup;

  constructor(
    private store: Store<{ todos: Todo[] }>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
    });
  }

  public addTodo = () => {
    this.store.dispatch(
      todos.actions.addTodo({ title: this.form.value.title })
    );
    this.form.reset();
  };
}

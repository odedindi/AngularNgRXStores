import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { counter } from 'src/app/stores';

@Component({
  selector: 'app-counter-buttons',
  template: `
    <section class="row">
      <section class="col-6 pr-0 m-0">
        <button
          class="btn btn-primary p-2"
          style="width: 100%"
          (click)="increment()"
        >
          +
        </button>
      </section>
      <section class="col-6 pl-0 m-0">
        <button
          class="btn btn-primary p-2"
          style="width: 100%"
          (click)="decrement()"
        >
          -
        </button>
      </section>
    </section>
    <button
      class="btn btn-danger"
      style="width: 100%; padding: 0.5rem"
      (click)="reset()"
    >
      Reset Counter
    </button>
  `,
})
export class CounterButtonsComponent {
  constructor(private store: Store<{ count: number }>) {}

  public increment = () => this.store.dispatch(counter.actions.increment());
  public decrement = () => this.store.dispatch(counter.actions.decrement());
  public reset = () => this.store.dispatch(counter.actions.reset());
}

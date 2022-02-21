import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter',
  template: `
    <section class="card p-2 m-2">
      <h5
        class="card-header text-center p-2"
        style="background-color: transparent;"
      >
        Counter: {{ count$ | async }}
      </h5>
      <app-counter-buttons></app-counter-buttons>
    </section>
  `,
})
export class CounterComponent {
  public count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    // Connect `count$` stream to `count` store state
    this.count$ = this.store.select('count');
  }
}

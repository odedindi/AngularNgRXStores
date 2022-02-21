import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import type { Scoreboard } from 'src/app/types/scoreboard.interface';

@Component({
  selector: 'app-scoreboard-view',
  template: `<section class="card p-2 m-2">
    <h5
      class="card-header text-center p-2"
      style="background-color: transparent"
    >
      Game Scoreboard
    </h5>
    <section class="card-body">
      <table class="table table-hover table-striped table-bordered text-center">
        <caption>
          Game Scoreboard
        </caption>
        <thead>
          <tr>
            <th scope="col">Home</th>
            <th scope="col">Away</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td *ngIf="scoreboard">{{ scoreboard.home }}</td>
            <td *ngIf="scoreboard">{{ scoreboard.away }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section> `,
})
export class ViewComponent implements OnInit, OnDestroy {
  private componentDestroyed$: Subject<boolean> = new Subject();
  private scoreboard$: Observable<Scoreboard>;

  public scoreboard: null | Scoreboard = null;

  constructor(private store: Store<{ game: Scoreboard }>) {
    this.scoreboard$ = this.store.select('game');
  }

  ngOnInit(): void {
    this.scoreboard$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(({ home, away }) => (this.scoreboard = { home, away }));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

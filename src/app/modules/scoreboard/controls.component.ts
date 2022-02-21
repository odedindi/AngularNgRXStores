import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { scoreboard } from 'src/app/stores';

import type { Scoreboard } from 'src/app/types/scoreboard.interface';

@Component({
  selector: 'app-scoreboard-controls',
  template: `
    <section class="row">
      <section class="col-6 pr-0 m-0">
        <button
          class="btn btn-primary p-2"
          style="width: 100%"
          (click)="homeScore()"
        >
          Home
        </button>
      </section>
      <section class="col-6 pl-0 m-0">
        <button
          class="btn btn-primary p-2"
          style="width: 100%"
          (click)="awayScore()"
        >
          Away
        </button>
      </section>
    </section>
    <button
      class="btn btn-danger"
      style="width: 100%; padding: 0.5rem"
      (click)="resetScores()"
    >
      Reset Game
    </button>
  `,
})
export class ControlsComponent implements OnInit {
  constructor(private store: Store<{ game: Scoreboard }>) {}

  ngOnInit(): void {}

  public awayScore = () => this.store.dispatch(scoreboard.actions.awayScore());
  public homeScore = () => this.store.dispatch(scoreboard.actions.homeScore());
  public resetScores = () =>
    this.store.dispatch(scoreboard.actions.resetScore());
}

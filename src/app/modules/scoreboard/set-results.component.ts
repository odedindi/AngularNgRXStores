import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { scoreboard } from 'src/app/stores';

import { Scoreboard } from 'src/app/types/scoreboard.interface';

@Component({
  selector: 'app-scoreboard-set-results',
  template: `
    <form [formGroup]="form" novalidate>
      <section class="row">
        <section class="form-group form-floating col-6">
          <input
            type="number"
            class="form-control text-center"
            formControlName="home"
            placeholder="Home"
            #home
            min="0"
            numbersOnly
          />
          <label [for]="home" class="col-md-4">Home</label>
        </section>
        <section class="form-group form-floating col-6">
          <input
            type="number"
            class="form-control text-center"
            formControlName="away"
            placeholder="Away"
            #away
            min="0"
            numbersOnly
          />
          <label [for]="away" class="col-md-4">Away</label>
        </section>
        <section class="col-md-4">
          <button>Set Scoreboard</button>
        </section>
      </section>
    </form>
  `,
})
export class SetResultsComponent implements OnInit, OnDestroy {
  private componentDestroyed$: Subject<boolean> = new Subject();

  private scoreboard$: Observable<Scoreboard>;
  private scoreboard: null | Scoreboard = null;

  public form: FormGroup;
  constructor(
    private store: Store<{ game: Scoreboard }>,
    private fb: FormBuilder
  ) {
    this.scoreboard$ = this.store.select(scoreboard.featureKey);

    this.form = this.fb.group({
      home: new FormControl(null),
      away: new FormControl(null),
    });
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

  public setScores = ({ home, away }: { home?: number; away?: number }) =>
    this.store.dispatch(
      scoreboard.actions.setScores({
        game: {
          home: home ?? this.scoreboard!.home,
          away: away ?? this.scoreboard!.away,
        },
      })
    );
}

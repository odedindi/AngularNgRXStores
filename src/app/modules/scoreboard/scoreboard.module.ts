import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { DirectivesModule } from 'src/app/modules/directives/directives.module';

import { scoreboard } from 'src/app/stores';

import { ViewComponent } from './view.component';
import { ControlsComponent } from './controls.component';
import { SetResultsComponent } from './set-results.component';

@NgModule({
  declarations: [ViewComponent, ControlsComponent, SetResultsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(scoreboard.featureKey, scoreboard.reducer),
    DirectivesModule,
  ],
  exports: [ViewComponent, ControlsComponent, SetResultsComponent],
})
export class ScoreboardModule {}

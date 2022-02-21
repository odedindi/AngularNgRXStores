import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { DirectivesModule } from './modules/directives/directives.module';
import { ScoreboardModule } from './modules/scoreboard/scoreboard.module';

import { AccordionComponent } from './modules/shared-components/accordion.component';
import { CounterComponent } from './components/counter/counter.component';
import { CounterButtonsComponent } from './components/counter/counterButtons.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { CurrencyFormComponent } from './components/currency/currency-form/currency-form.component';

import { counter, currency, todos } from './stores';
import { TodosModule } from './modules/todos/todos.module';
import { SharedComponentsModule } from './modules/shared-components/shared-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodosWithEffectComponent } from './components/todos-with-effect/todos-with-effect.component';
import { TodosEffect } from './components/todos-with-effect/todos.effect';

@NgModule({
  declarations: [
    AppComponent,

    CounterComponent,
    CounterButtonsComponent,
    CurrencyComponent,
    CurrencyFormComponent,
    TodosWithEffectComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([TodosEffect]),
    StoreModule.forRoot({
      count: counter.reducer,
      currencies: currency.reducer,
      [todos.storekey]: todos.reducer,
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      // logOnly: environment.production,
      autoPause: true,
    }),
    SharedComponentsModule,
    DirectivesModule,
    ScoreboardModule,
    TodosModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<section class="container-fluid">
    <br />
    <section class="card">
      <h2 class="card-header text-center p-4">{{ title }}</h2>
      <app-accordion title="Counter"><app-counter></app-counter></app-accordion>
      <app-accordion title="Correncies List"
        ><app-currency></app-currency
      ></app-accordion>
      <app-accordion title="Scoreboard">
        <app-accordion title="Set Scoreboard">
          <app-scoreboard-set-results></app-scoreboard-set-results>
        </app-accordion>
        <app-scoreboard-view></app-scoreboard-view>
        <app-scoreboard-controls></app-scoreboard-controls>
      </app-accordion>
      <app-accordion title="Todos">
        <app-new-todo-form></app-new-todo-form>
        <app-todos-with-effect></app-todos-with-effect>
      </app-accordion>
    </section>
  </section> `,
})
export class AppComponent {
  public title = 'NG Stores Examples';
}

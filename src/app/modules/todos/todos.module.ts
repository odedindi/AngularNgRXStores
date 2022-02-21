import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from '../directives/directives.module';
import { SharedComponentsModule } from 'src/app/modules/shared-components/shared-components.module';

import { NewTodoFormComponent } from './new-todo-form.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [NewTodoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    DirectivesModule,
    BsDropdownModule,
  ],
  exports: [NewTodoFormComponent],
})
export class TodosModule {}

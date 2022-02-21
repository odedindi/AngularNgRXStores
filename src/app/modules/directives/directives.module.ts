import { NgModule } from '@angular/core';

import { NumbersOnlyDirective } from './numbers-only.directive';
import { RequiredSignDirective } from './required-sign.directive';

@NgModule({
  declarations: [NumbersOnlyDirective, RequiredSignDirective],
  exports: [NumbersOnlyDirective, RequiredSignDirective],
  imports: [],
})
export class DirectivesModule {}

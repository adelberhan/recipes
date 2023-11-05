import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from '../alert/error/error.component';
import { DropdownDirective } from '../drop-down.directive';
import { PlaceholderDirective } from '../placeholder/placeholder.directive';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FormsModule } from '@angular/forms';

const module = [
  DropdownDirective,
  SpinnerComponent,
  ErrorComponent,
  PlaceholderDirective,
];

@NgModule({
  declarations: [...module],
  imports: [CommonModule, FormsModule],
  exports: [...module, CommonModule, FormsModule],
})
export class SharedModule {}

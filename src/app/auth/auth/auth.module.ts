import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],

  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    FormsModule,
    SharedModule,
  ],
})
export class AuthModule {}

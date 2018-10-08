import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';

import { PasswordResetFinishRoutingModule } from './password-reset-finish-routing.module';
import { PasswordResetFinishComponent } from './password-reset-finish.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertModule.forRoot(),
    PasswordResetFinishRoutingModule
  ],
  declarations: [PasswordResetFinishComponent]
})
export class PasswordResetFinishModule { }

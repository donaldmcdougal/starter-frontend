import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule } from 'ngx-bootstrap/alert';

import { ActivateRoutingModule } from './activate-routing.module';
import { ActivateComponent } from './activate.component';

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ActivateRoutingModule
  ],
  declarations: [ActivateComponent]
})
export class ActivateModule { }

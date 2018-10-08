import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordResetFinishComponent } from './password-reset-finish.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetFinishComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetFinishRoutingModule { }

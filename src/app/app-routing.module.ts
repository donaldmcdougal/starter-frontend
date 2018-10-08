import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { AuthGuardAdminService } from './core/services/auth-guard-admin.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
    data: { title: 'Home | Starter' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'account',
    loadChildren: './user/account/account.module#AccountModule',
    data: { title: 'Account | Starter' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    data: { title: 'Admin | Starter' },
    canActivate: [AuthGuardAdminService]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: { title: 'Login | Starter' }
  },
  {
    path: 'password-reset-init',
    loadChildren: './user/password-reset-init/password-reset.module#PasswordResetModule',
    data: { title: 'Reset Password | Starter' }
  },
  {
    path: 'password-reset-finish/:resetKey',
    loadChildren: './user/password-reset-finish/password-reset-finish.module#PasswordResetFinishModule',
    data: { title: 'Reset Password | Starter' }
  },
  {
    path: 'activate/:activationKey',
    loadChildren: './user/activate/activate.module#ActivateModule'
  },
  {
    path: '**',
    loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule',
    data: { title: 'Page Not Found | Starter' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from './token.service';
import { Observable, of } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: TokenService, public account: AccountService, public router: Router) {}

  canActivate(): Observable<boolean> {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return of(false);
    } else {
      return this.account.verifyAccount();
    }
  }
}

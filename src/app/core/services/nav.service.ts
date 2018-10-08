import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private tokenService: TokenService) { }

  private _navItemSource = new BehaviorSubject<boolean>(this.tokenService.isAuthenticated());
  private _adminItemSource = new BehaviorSubject<boolean>(false);
  navItem$ = this._navItemSource.asObservable();
  adminItem$ = this._adminItemSource.asObservable();

  showNav(bool: boolean): void {
    this._navItemSource.next(bool);
  }

  showAdmin(bool: boolean): void {
    this._adminItemSource.next(bool);
  }
}

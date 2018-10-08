import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'token';

  constructor(private local: LocalStorageService, private jwt: JwtHelperService) { }

  setToken(token: string): void {
    this.local.set(this.TOKEN_KEY, token, 0, 's');
  }

  removeToken(): void {
    this.local.remove(this.TOKEN_KEY);
  }

  getToken(): string {
    return this.local.get(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    // return !this.jwt.isTokenExpired(this.getToken());
    return !!this.getToken();
  }
}

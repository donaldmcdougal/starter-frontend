import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, of } from 'rxjs';
import { ResponseMessage } from '../common/response-message';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  verifyAccount(): Observable<boolean> {
    if (this.tokenService.getToken()) {
      return this.http.get<boolean>(environment.baseUrl + 'api/account/verify');
    } else {
      return of(false);
    }
  }

  verifyAdminAccount(): Observable<boolean> {
    if (this.tokenService.getToken()) {
      return this.http.get<boolean>(environment.baseUrl + 'api/account/verify/admin');
    } else {
      return of(false);
    }
  }

  getAllAccounts(): Observable<ResponseMessage> {
    if (this.tokenService.getToken()) {
      return this.http.get<ResponseMessage>(environment.baseUrl + 'api/accounts');
    } else {
      return of(new ResponseMessage());
    }
  }

  getAccount(): Observable<ResponseMessage> {
    if (this.tokenService.getToken()) {
      return this.http.get<ResponseMessage>(environment.baseUrl + 'api/account');
    } else {
      return of(new ResponseMessage());
    }
  }

  getAccountById(id: number): Observable<ResponseMessage> {
    if (this.tokenService.getToken()) {
      return this.http.get<ResponseMessage>(environment.baseUrl + 'api/admin/account/' + id);
    } else {
      return of(new ResponseMessage());
    }
  }

  createAccount(firstName: string,
                lastName: string,
                email: string,
                password: string,
                passwordConfirm: string,
                admin: boolean): Observable<ResponseMessage> {
    if (this.tokenService.getToken()) {
      return this.http.post<ResponseMessage>(environment.baseUrl + 'api/account', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirm_password: passwordConfirm,
        admin: admin
      });
    } else {
      return of(new ResponseMessage());
    }
  }

  updateAccount(firstName: string,
                lastName: string): Observable<ResponseMessage> {
    if (this.tokenService.getToken()) {
      return this.http.put<ResponseMessage>(environment.baseUrl + 'api/account', {
        first_name: firstName,
        last_name: lastName
      });
    } else {
      return of(new ResponseMessage());
    }
  }

  updateAccountById(firstName: string,
                    lastName: string,
                    admin: boolean,
                    id: number): Observable<ResponseMessage> {
    if (this.tokenService.getToken()) {
      return this.http.put<ResponseMessage>(environment.baseUrl + 'api/admin/account/' + id, {
        first_name: firstName,
        last_name: lastName,
        admin: admin
      });
    } else {
      return of (new ResponseMessage());
    }
  }

  requestPasswordReset(email: string): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(environment.baseUrl + 'api/account/reset/password', {
      email: email
    });
  }

  resetPasswordUsingResetKey(password: string, passwordConfirm: string, resetKey: string): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(environment.baseUrl + 'api/account/reset/password/' + resetKey, {
      password: password,
      password_confirm: passwordConfirm
    });
  }

  activateAccount(activationKey: string): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(environment.baseUrl + 'api/account/activate', {
      activation_key: activationKey
    });
  }

  updatePassword(password: string,
                 passwordConfirm: string): Observable<ResponseMessage> {
    if (this.tokenService.getToken()) {
      return this.http.put<ResponseMessage>(environment.baseUrl + 'api/account/password', {
        password: password,
        password_confirm: passwordConfirm
      });
    } else {
      return of(new ResponseMessage());
    }
  }

  deleteAccount(id: number): Observable<ResponseMessage> {
    if (this.tokenService.getToken()) {
      return this.http.delete<ResponseMessage>(environment.baseUrl + `api/account/${id}`);
    } else {
      return of(new ResponseMessage());
    }
  }

  login(email: string,
        password: string): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(environment.baseUrl + 'api/login', {
      email: email,
      password: password
    });
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }
}

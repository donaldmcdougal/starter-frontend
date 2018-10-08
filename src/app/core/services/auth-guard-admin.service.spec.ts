import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageService } from 'angular-web-storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { AuthGuardAdminService } from './auth-guard-admin.service';
import { AccountService } from './account.service';
import { TokenService } from './token.service';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        AuthGuardAdminService,
        JwtHelperService,
        AccountService,
        TokenService,
        AuthGuardService,
        HttpClient,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        }
      ],
      imports: [
        HttpClientModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              const token: any = JSON.parse(localStorage.getItem('token'));
              if (token) {
                return token['_value'];
              } else {
                return null;
              }
            },
            whitelistedDomains: ['localhost:8472']
          }
        })
      ]
    });
  });

  it('should be created', inject([AuthGuardAdminService], (service: AuthGuardAdminService) => {
    expect(service).toBeTruthy();
  }));
});

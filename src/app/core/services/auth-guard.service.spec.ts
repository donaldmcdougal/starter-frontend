import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageService } from 'angular-web-storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { AuthGuardService } from './auth-guard.service';
import { AccountService } from './account.service';
import { TokenService } from './token.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
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

  it('should be created', inject([TokenService, Router, HttpClient, AccountService, JwtHelperService, AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});

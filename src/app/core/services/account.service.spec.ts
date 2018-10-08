import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { AccountService } from './account.service';
import { TokenService } from './token.service';

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
      ],
      providers: [
        LocalStorageService,
        AccountService,
        JwtHelperService
      ]
    });
  });

  it('should be created', inject([TokenService, HttpClient, AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});

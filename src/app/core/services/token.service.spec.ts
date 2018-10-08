import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageService } from 'angular-web-storage';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { TokenService } from './token.service';

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        TokenService,
        JwtHelperService
      ],
      imports: [
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

  it('should be created', inject([TokenService], (service: TokenService) => {
    expect(service).toBeTruthy();
  }));
});

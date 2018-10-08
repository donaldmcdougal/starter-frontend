import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageService } from 'angular-web-storage';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { NavService } from './nav.service';
import { HttpClientModule } from '@angular/common/http';

describe('NavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        NavService,
        JwtHelperService
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

  it('should be created', inject([NavService], (service: NavService) => {
    expect(service).toBeTruthy();
  }));
});

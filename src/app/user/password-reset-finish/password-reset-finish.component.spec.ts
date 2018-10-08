import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';
import { LocalStorageService } from 'angular-web-storage';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { TokenService } from '../../core/services/token.service';
import { PasswordResetFinishComponent } from './password-reset-finish.component';

describe('PasswordResetFinishComponent', () => {
  let component: PasswordResetFinishComponent;
  let fixture: ComponentFixture<PasswordResetFinishComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: { } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordResetFinishComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        AlertModule.forRoot(),
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
        TokenService,
        LocalStorageService,
        JwtHelperService,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        {
          provide: ActivatedRoute, useValue: fakeActivatedRoute
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

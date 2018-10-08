import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AngularWebStorageModule } from 'angular-web-storage';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TokenService } from './core/services/token.service';
import { AccountService } from './core/services/account.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularWebStorageModule,
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
    }),
    BsDropdownModule.forRoot(),
    AppRoutingModule
  ],
  providers: [Title, TokenService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }

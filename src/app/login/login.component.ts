import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../core/services/token.service';
import { AccountService } from '../core/services/account.service';
import { NavService } from '../core/services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;
  email: string;
  password: string;

  constructor(private tokenService: TokenService,
              private accountService: AccountService,
              private navService: NavService,
              private router: Router) {
    this.loggedIn = false;
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
    this.accountService.verifyAccount().subscribe(show => {
      if (show) {
        this.loggedIn = true;
        this.navService.showNav(true);
        this.accountService.verifyAdminAccount().subscribe(admin => {
          this.navService.showAdmin(admin);
        });
        this.router.navigate(['/']);
      } else {
        this.loggedIn = false;
        this.navService.showNav(false);
        this.navService.showAdmin(false);
      }
    });
  }

  submitCredentials(): void {
    this.accountService.login(this.email, this.password).subscribe(data => {
      if (data.success === 1) {
        this.tokenService.setToken(data.data[0]);
        this.loggedIn = true;
        this.navService.showNav(true);
        this.accountService.verifyAdminAccount().subscribe(admin => {
          this.navService.showAdmin(admin);
        });
        this.router.navigate(['/']);
      } else {
        this.tokenService.removeToken();
        this.loggedIn = false;
        this.navService.showNav(false);
        alert('Authentication failed.');
      }
    });
  }

}

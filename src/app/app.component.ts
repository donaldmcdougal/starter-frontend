import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AccountService } from './core/services/account.service';
import { NavService } from './core/services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  showItems: boolean;
  subscription1: Subscription;
  subscription2: Subscription;
  showAdminMenu: boolean;

  constructor(private titleService: Title,
              private accountService: AccountService,
              private navService: NavService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.showAdminMenu = false;
    this.titleService.setTitle('Home | Altura');
  }

  ngOnInit() {
    this.showItems = this.accountService.isAuthenticated();
    this.subscription1 = this.navService.navItem$.subscribe(item => this.showItems = item);
    this.subscription2 = this.navService.adminItem$.subscribe(item => this.showAdminMenu = item);

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => this.titleService.setTitle(event['title']));

    this.accountService.verifyAdminAccount().subscribe(data => {
      this.showAdminMenu = data;
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  logout(): void {
    this.showItems = false;
    this.accountService.logout();
    this.showAdminMenu = false;
    this.router.navigate(['/login']);
  }
}

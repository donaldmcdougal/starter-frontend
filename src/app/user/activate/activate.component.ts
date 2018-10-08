import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../core/common/message';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  private activationKey: string;
  msgs: Message[];

  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router) {
    this.msgs = [];
  }

  ngOnInit() {
    this.activationKey = this.route.snapshot.params['activationKey'];

    this.accountService.activateAccount(this.activationKey).subscribe(msg => {
      if (msg.success === 1) {
        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: 'Success: ',
          detail: 'Your account has been activated.  Redirecting to login page in five seconds.'
        });
        setTimeout(() => {
          this.msgs = [];
        }, 4000);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      } else {
        this.msgs.push({severity: 'danger', summary: 'Error: ', detail: msg.data[0]});
      }
    });
  }

  onClosed(dismissedAlert: any): void {
    this.msgs = this.msgs.filter(alert => alert !== dismissedAlert);
  }

}

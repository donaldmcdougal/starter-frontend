import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';
import { Message } from '../../core/common/message';

@Component({
  selector: 'app-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['./password-reset-finish.component.scss']
})
export class PasswordResetFinishComponent implements OnInit {

  private resetKey: string;
  password: string;
  passwordConfirm: string;
  msgs: Message[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) {
    this.msgs = [];
  }

  ngOnInit() {
    this.resetKey = this.route.snapshot.params['resetKey'];
  }

  resetPassword(): void {
    this.accountService.resetPasswordUsingResetKey(this.password, this.passwordConfirm, this.resetKey).subscribe(msg => {
      if (msg.success === 1) {
        this.msgs = [];
        this.msgs.push({
          severity: 'success',
          summary: 'Success: ',
          detail: 'Your password has been reset.  Redirecting to login page in five seconds.'});
        setTimeout(() => {
          this.msgs = [];
        }, 4000);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      } else {
        this.msgs.push({severity: 'Error', summary: 'Error: ', detail: msg.data[0]});
      }
    });
  }

  onClosed(dismissedAlert: any): void {
    this.msgs = this.msgs.filter(alert => alert !== dismissedAlert);
  }

}

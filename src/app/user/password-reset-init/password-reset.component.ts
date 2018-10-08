import { Component } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import {Message} from '../../core/common/message';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  email: string;
  msgs: Message[];

  constructor(private accountService: AccountService) {
    this.msgs = [];
  }

  requestPasswordReset(): void {
    this.accountService.requestPasswordReset(this.email).subscribe(msg => {
      this.msgs = [];
      if (msg.success === 1) {
        this.msgs.push(
          { severity: 'success',
            summary: 'Success: ',
            detail: 'Password reset request sent.  Check your email for instructions on how to reset your password.' });
        setTimeout(() => {
          this.msgs = [];
        }, 5000);
      } else {
        this.msgs.push({severity: 'error', summary: 'Error: ', detail: msg.data[0]});
      }
    });
  }

  onClosed(dismissedAlert: any): void {
    this.msgs = this.msgs.filter(alert => alert !== dismissedAlert);
  }

}

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { Message } from '../../core/common/message';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  firstName: string;
  lastName: string;
  changingPassword: boolean;
  password: string;
  passwordConfirm: string;
  msgs: Message[];

  constructor(private accountService: AccountService) {
    this.firstName = '';
    this.lastName = '';
    this.changingPassword = false;
    this.password = '';
    this.passwordConfirm = '';
    this.msgs = [];
  }

  ngOnInit() {
    this.accountService.getAccount().subscribe(msg => {
      if (msg.success === 1) {
        this.firstName = msg.data[0].first_name;
        this.lastName = msg.data[0].last_name;
      } else {
        this.firstName = '';
        this.lastName = '';
        this.showErrorMessage(msg.data[0]);
      }
    });
  }

  updateAccount(): void {
    this.accountService.updateAccount(this.firstName, this.lastName).subscribe(msg => {
      if (msg.success === 1) {
        this.showSuccessMessage('Account Updated');
      } else {
        this.showErrorMessage(msg.data[0]);
      }
    });
  }

  updatePassword(): void {
    this.accountService.updatePassword(this.password, this.passwordConfirm).subscribe(msg => {
      if (msg.success === 1) {
        this.password = '';
        this.passwordConfirm = '';
        this.showSuccessMessage('Password Updated');
      } else {
        this.showErrorMessage(msg.data[0]);
      }
    });
  }

  onClosed(dismissedAlert: any): void {
    this.msgs = this.msgs.filter(alert => alert !== dismissedAlert);
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.msgs = [];
    this.msgs.push({severity: severity, summary: summary, detail: detail});
  }

  private showSuccessMessage(detail: string): void {
    this.showMessage('success', 'Success', detail);
  }

  private showWarningMessage(detail: string): void {
    this.showMessage('warn', 'Warning', detail);
  }

  private showErrorMessage(detail: string): void {
    this.showMessage('error', 'Error', detail);
  }

}

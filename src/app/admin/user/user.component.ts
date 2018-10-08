import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AccountService } from '../../core/services/account.service';
import { Message } from '../../core/common/message';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any[];
  userId: number;
  isUpdating: boolean;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  admin: boolean;
  modalRef: BsModalRef;
  msgs: Message[];

  constructor(private accountService: AccountService, private modalService: BsModalService) {
    this.users = [];
    this.msgs = [];
    this.userId = 0;
    this.isUpdating = false;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.emailConfirm = '';
    this.password = '';
    this.passwordConfirm = '';
    this.admin = false;
  }

  ngOnInit() {
    this.listAccounts();
  }

  cancelDialog(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  showCreateDialog(template: TemplateRef<any>): void {
    this.isUpdating = false;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.admin = false;
  }

  showDialog(template: TemplateRef<any>, id: number): void {
    this.accountService.getAccountById(id).subscribe(msg => {
      if (msg.success === 1) {
        this.userId = id;
        const acc = msg.data[0];
        this.isUpdating = true;
        this.firstName = acc.first_name;
        this.lastName = acc.last_name;
        this.email = acc.email;
        this.admin = acc.is_admin;
        this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
      } else {
        this.isUpdating = false;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        if (this.modalRef) {
          this.modalRef.hide();
        }
        console.log(msg.data);
        this.showErrorMessage(msg.data[0]);
      }
    });
  }

  deleteUser(id: number): void {
    this.accountService.deleteAccount(id).subscribe(msg => {
      if (msg.success === 1) {
        this.showSuccessMessage('User Deleted');
        this.listAccounts();
      } else {
        this.showErrorMessage(msg.data[0]);
      }
    });
  }

  saveUser(id?: number): void {
    if (this.isUpdating) {
      this.updateUser(id);
    } else {
      this.createUser();
    }
  }

  onClosed(dismissedAlert: any): void {
    this.msgs = this.msgs.filter(alert => alert !== dismissedAlert);
  }

  private createUser(): void {
    this.accountService.createAccount(
      this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.passwordConfirm,
      this.admin).subscribe(msg => {
        if (msg.success === 1) {
          this.cancelDialog();
          this.listAccounts();
          this.showSuccessMessage('User Created');
        } else {
          this.showErrorMessage(msg.data[0]);
        }
    });
  }

  private updateUser(id: number): void {
    this.accountService.updateAccountById(this.firstName, this.lastName, this.admin, id).subscribe(msg => {
      if (msg.success === 1) {
        this.cancelDialog();
        this.listAccounts();
        this.showSuccessMessage('User Updated');
      } else {
        this.showErrorMessage(msg.data[0]);
      }
    });
  }

  private listAccounts(): void {
    this.accountService.getAllAccounts().subscribe(msg => {
      if (msg.success === 1) {
        this.users = msg.data;
      } else {
        this.users = [];
        this.showErrorMessage(msg.data[0]);
      }
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.msgs = [];
    this.msgs.push({severity: severity, summary: summary, detail: detail});
  }

  private showSuccessMessage(detail: string): void {
    this.showMessage('success', 'Success', detail);
  }

  private showErrorMessage(detail: string): void {
    this.showMessage('danger', 'Error', detail);
  }

}

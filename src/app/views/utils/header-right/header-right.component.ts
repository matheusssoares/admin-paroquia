import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { SharedModule } from '../../../modules/shared/shared.module';
import { AuthService } from '../../../services/auth.service';
import { ChangeTemplateService } from '../../../services/change-template.service';

@Component({
  selector: 'app-header-right',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header-right.component.html',
  styleUrl: './header-right.component.scss',
})
export class HeaderRightComponent {
  private dialogRef!: NbDialogRef<any>;
  constructor(
    private authService: AuthService,
    private dialogService: NbDialogService,
    private router: Router,
    private changeService: ChangeTemplateService
  ) {}

  logout(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {
      hasBackdrop: true,
      closeOnEsc: true,
    });
  }

  async yes() {
    this.authService.logout();
    this.changeService.detectChange();
    this.changeService.changeTemplate(true);
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.router.navigateByUrl('');
  }
}

import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { SharedModule } from '../../../modules/shared/shared.module';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header-right',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header-right.component.html',
  styleUrl: './header-right.component.scss',
})
export class HeaderRightComponent {
  constructor(
    private authService: AuthService,
    private dialogService: NbDialogService,
    private router: Router
  ) {}

  logout(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      hasBackdrop: true,
      closeOnEsc: true,            
    });
  }

  yes() {
    this.authService.logout();
    this.router.navigateByUrl('')
  }
}

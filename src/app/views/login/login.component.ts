import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { ChangeTemplateService } from '../../services/change-template.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private changeTemplateService: ChangeTemplateService,
    private router: Router
    ) {

  }
  showPassword = true;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  goTo(path: string) {
    this.changeTemplateService.changeTemplate(true);
    this.router.navigateByUrl(path);
  }
}

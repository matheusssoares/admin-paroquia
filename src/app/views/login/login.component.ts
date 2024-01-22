import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition } from '@nebular/theme';
import { SharedModule } from '../../modules/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { ChangeTemplateService } from '../../services/change-template.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, ChangeTemplateService],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  public loading: boolean = false;
  physicalPositions = NbGlobalPhysicalPosition;
  showPassword = true;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private changeService: ChangeTemplateService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    this.loading = true;

    try {
      const result = await this.authService.loginUserEmailAndPassword(
        this.form.value.email,
        this.form.value.password
      );
      if (result) {
        this.loading = false;
        this.changeService.showToastr(
          'Login efetuado com sucesso',
          'Parabéns',
          {
            duration: 3000,
            position: this.physicalPositions.TOP_RIGHT,
            status: 'success',
          }
        );

        this.router.navigateByUrl('admin/dashboard');
      }
    } catch (err) {
      this.loading = false;
      this.changeService.detectChange();
      this.changeService.showToastr('Erro ao efetuar login', 'Putzzzz!', {
        duration: 3000,
        position: this.physicalPositions.TOP_RIGHT,
        status: 'danger',
      });
    }
  }
}

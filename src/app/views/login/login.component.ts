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

  async ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    await this.getSecao();    
  }

  async getSecao() {
    const result = await this.authService.isUserLogged();
    if(result) {
      this.router.navigateByUrl('admin/dashboard');
    }
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
        this.changeService.detectChange();
        this.changeService.showToastr(
          'Login efetuado com sucesso',
          'Parabéns',
          {
            duration: 3000,
            position: this.physicalPositions.TOP_RIGHT,
            status: 'success',
          }
        );

        setTimeout(() => {
          this.router.navigateByUrl('admin/dashboard');
        }, 1500)
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

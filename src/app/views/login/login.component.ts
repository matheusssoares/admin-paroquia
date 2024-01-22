import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { ChangeTemplateService } from '../../services/change-template.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  constructor(
    private changeTemplateService: ChangeTemplateService,
    private fb: FormBuilder,
    private router: Router
    ) {      

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],     
    });
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

  onSubmit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false
    }, 3000)
  }
}

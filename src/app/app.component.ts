import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedModule } from './modules/shared/shared.module';
import { AuthService } from './services/auth.service';
import { ChangeTemplateService } from './services/change-template.service';
import { HeaderRightComponent } from './views/utils/header-right/header-right.component';
import { HeaderComponent } from './views/utils/header/header.component';
import { MenuComponent } from './views/utils/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedModule,
    HeaderComponent,
    HeaderRightComponent,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChangeTemplateService],
})
export class AppComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  isClickLogout: boolean = false;
  subscription: Array<Subscription> = [];
  constructor(
    private authService: AuthService,
    private changeService: ChangeTemplateService
  ) {}

  ngOnInit(): void {
    const clickLogout = this.changeService
      .getChangeTemplate()
      .subscribe((data) => {
        this.isClickLogout = data;
      });

    this.subscription.push(clickLogout);
    const sub = this.authService.authState$.subscribe((data) => {
      if (data) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        this.changeService.detectChange();
        if (this.isClickLogout) {
          this.changeService.showToastr(
            'Logout efetuado com sucesso.',
            'Informação!',
            {
              status: 'info',
            }
          );
        }
      }

      this.subscription.push(sub);
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((data) => {
      data?.unsubscribe();
    });

    // Adiar a recarga da página em 100 milissegundos
    setTimeout(() => {
      location.reload();
    }, 100);
  }
}

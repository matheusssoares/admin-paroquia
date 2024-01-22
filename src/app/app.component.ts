import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { SharedModule } from './modules/shared/shared.module';
import { ChangeTemplateService } from './services/change-template.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    SharedModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ChangeTemplateService
  ]
})
export class AppComponent implements OnInit {
  displayBaseTemplate!: boolean;
  subscription: Array<Subscription> = [];

  constructor(
    private changeTemplateService: ChangeTemplateService,
    private sidebarService: NbSidebarService
  ) {}
  ngOnInit(): void {
    this.getInitialTemplate();
  }

  getInitialTemplate() {
    const sub = this.changeTemplateService
      .getChangeTemplate()
      .subscribe((data) => {
        console.log('atualizou: ', data);

        this.displayBaseTemplate = data;
      });

    this.subscription.push(sub);
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
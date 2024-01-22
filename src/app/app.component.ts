import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
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
})
export class AppComponent implements OnInit {
  displayBaseTemplate!: boolean;
  subscription: Array<Subscription> = [];
  items: NbMenuItem[] = [
    {
      title: 'DASHBOARD',
      icon: 'home-outline',
      home: true,
    },
    {
      title: 'AGENDAS',
      icon: 'calendar-outline',
      url: 'admin/agendas',
    },
    {
      title: 'NOTÍCIAS',
      icon: 'message-square-outline',
      url: 'admin/noticias',
    },
    {
      title: 'COMUNIDADES',
      icon: 'people-outline',
      url: 'admin/comunidades',
    },
    {
      title: 'A PARÓQUIA',
      icon: 'keypad-outline',
      url: 'admin/a-paroquia',
    },
    {
      title: 'LITURGIA',
      icon: 'book-open-outline',
      url: 'admin/liturgia',
    },
    {
      title: 'ORAÇÕES',
      icon: 'bookmark-outline',
      url: 'admin/oracoes',
    },
    {
      title: 'MEMBROS',
      icon: 'person-outline',
      url: 'admin/membros',
    },
    {
      title: 'DIZIMISTAS',
      icon: 'gift-outline',
      url: 'admin/dizimistas',
    },
    {
      title: 'PEDIDOS DE INTENÇÃO',
      icon: 'mic-outline',
      url: 'admin/pedidos-de-intencao',
    },
    {
      title: 'NOTIFICAÇÕES',
      icon: 'bell-outline',
      url: 'admin/notificacoes',
    },
    {
      title: 'CONTATOS',
      icon: 'phone-outline',
      url: 'admin/contatos',
    },
  ];

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
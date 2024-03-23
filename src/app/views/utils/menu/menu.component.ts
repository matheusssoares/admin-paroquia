import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { SharedModule } from '../../../modules/shared/shared.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  items: NbMenuItem[] = [
    {
      title: 'DASHBOARD',
      icon: 'home-outline',
      home: true,
      link: '../../admin/dashboard',
    },
    {
      title: 'AGENDAS',
      icon: 'calendar-outline',
      link: '../../admin/agendas',
    },
    {
      title: 'NOTÍCIAS',
      icon: 'message-square-outline',
      link: '../../admin/noticias',
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
    {
      title: 'USUÁRIOS',
      icon: 'person-add-outline',
      link: '../../admin/usuarios',
    },
  ];
  constructor() {}
}

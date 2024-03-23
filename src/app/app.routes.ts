import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    title: 'Paróquia São Joaquim - Login',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Paróquia São Joaquim - Login',
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./views/admin/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    title: 'Paróquia São Joaquim - Painel de Controle',
    canActivate: [AuthService],
  },
  {
    path: 'admin/agendas',
    loadComponent: () =>
      import('./views/admin/agendas/agendas.component').then(
        (c) => c.AgendasComponent
      ),
    title: 'Paróquia São Joaquim - Agendas',
    canActivate: [AuthService],
  },
  {
    path: 'admin/noticias',
    loadComponent: () =>
      import('./views/admin/noticias/noticias.component').then(
        (c) => c.NoticiasComponent
      ),
    title: 'Paróquia São Joaquim - Notícias',
    canActivate: [AuthService],
  },
  {
    path: 'admin/usuarios',
    loadComponent: () =>
      import('./views/admin/usuarios/usuarios.component').then(
        (c) => c.UsuariosComponent
      ),
    title: 'Paróquia São Joaquim - Usuários',
    canActivate: [AuthService],
  },
];

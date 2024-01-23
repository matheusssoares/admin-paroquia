import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
        title: 'Paróquia São Joaquim - Login'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Paróquia São Joaquim - Login'
    },
    {
        path: 'admin/dashboard',
        loadComponent: () => import('./views/admin/dashboard/dashboard.component').then(c => c.DashboardComponent),
        title: 'Paróquia São Joaquim - Painel de Controle',
        canActivate:[AuthService]
    }
];

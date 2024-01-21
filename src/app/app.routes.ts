import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
        title: 'Paróquia São Joaquim - Login'
    }
];

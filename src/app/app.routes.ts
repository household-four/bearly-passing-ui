import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'home/:userid',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'study-set/:id',
        loadComponent: () => import('./study-set/study-set.component').then(m => m.StudySetComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./create/create.component').then(m => m.CreateComponent),
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];

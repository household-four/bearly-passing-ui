import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudyComponent } from './study/study.component';
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
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'study/:id',
        loadComponent: () => import('./study/study.component').then(m => m.StudyComponent),
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

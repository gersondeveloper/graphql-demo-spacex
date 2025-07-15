import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page').then(m => m.HomePage),
    title: 'Home'
  },
  {
    path: 'launches',
    loadComponent: () => import('./features/launches-page/launches-page').then(m => m.LaunchesPage),
    title: 'Launches'
  },
  {
    path: 'rockets',
    loadComponent: () => import('./features/rockets/rockets-page').then(m => m.RocketsPageComponent),
    title: 'Rockets'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about-page').then(m => m.AboutPage),
    title: 'About'
  }
];

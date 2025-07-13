import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page/home-page').then(m => m.HomePage),
    title: 'Home'
  },
  {
    path: 'launches',
    loadComponent: () => import('./features/launches-page/launches-page').then(m => m.LaunchesPage),
    title: 'Launches'
  },
  {
    path: 'rockets',
    loadComponent: () => import('./features/rockets/rockets-page/rockets-page').then(m => m.RocketsPage),
    title: 'Rockets'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about/about-page/about-page').then(m => m.AboutPage),
    title: 'About'
  }
];

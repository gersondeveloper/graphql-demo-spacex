import { Routes } from '@angular/router';
import {ROCKETS_COLUMN_DEFS} from '@shared/ag-grid/rockets-grid.config';
import {LAUNCHES_COLUMN_DEFS} from '@shared/ag-grid/launches-grid.config';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page').then(m => m.HomePage),
    title: 'Home'
  },
  {
    path: 'launches',
    loadComponent: () => import('./features/launches-page/launches-page').then(m => m.LaunchesPage),
    data: {
      queryName: "GetPastLaunches",
      queryMethod: "pastLaunches",
      schema: LAUNCHES_COLUMN_DEFS
    },
    title: 'Launches',

  },
  {
    path: 'rockets',
    loadComponent: () => import('./features/rockets/rockets-page').then(m => m.RocketsPageComponent),
    data: {
      queryName: "GetRockets",
      queryMethod: "rockets",
      schema: ROCKETS_COLUMN_DEFS
    },
    title: 'Rockets'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about-page').then(m => m.AboutPage),
    title: 'About'
  }
];

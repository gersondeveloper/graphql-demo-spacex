import { Routes } from '@angular/router';
import {LaunchesPage} from './features/launches-page/launches-page';
import {HomePage} from './features/home/home-page/home-page';
import {RocketsPage} from './features/rockets/rockets-page/rockets-page';
import {AboutPage} from './features/about/about/about-page/about-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Home'
  },
  {
    path: 'launches',
    component: LaunchesPage,
    title: 'Launches'
  },
  {
    path: 'rockets',
    component: RocketsPage,
    title: 'Rockets'
  },
  {
    path: 'about',
    component: AboutPage,
    title: 'About'
  }
];

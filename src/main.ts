import { bootstrapApplication } from '@angular/platform-browser';
import {ModuleRegistry, AllCommunityModule, ClientSideRowModelModule} from 'ag-grid-community';
import { appConfig } from './app/app.config';
import { App } from './app/app';

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
]);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

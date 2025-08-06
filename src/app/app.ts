import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet, ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {NavSideBar} from "app/layout/nav-side-bar/nav-side-bar";
import {filter, map} from 'rxjs';
import {ColDef} from 'ag-grid-community';
import {GridPageService} from '@services/grid-page.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavSideBar,
  ],
  providers: [
    GridPageService
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('graphql-demo-spacex');

  constructor(private gridPageService: GridPageService) {
  }

  shouldRenderOutlet() {
    return this.gridPageService.schema !== null;
  }
}

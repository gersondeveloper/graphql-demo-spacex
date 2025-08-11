import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ThemeToggle} from "app/layout/theme-toggle/theme-toggle";
import {GridPageService} from '@services/grid-page.service';
import {QueryBuilder} from './query-builder/query-builder';

interface NavLink {
  goTo: string;
  pageName: string;
}

@Component({
  selector: 'app-nav-side-bar',
  imports: [
    ThemeToggle,
    QueryBuilder
  ],
  templateUrl: './nav-side-bar.html',
  styleUrl: './nav-side-bar.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavSideBar implements OnInit {
  ngOnInit(): void {

  }

  constructor(private gridPageService: GridPageService) {}

  navLinks: NavLink[] = [
    {goTo: "", pageName: "Home"},
    {goTo: "/rockets", pageName: "Rockets"},
    {goTo: "/launches", pageName: "Launches"},
    {goTo: "/about", pageName: "About"},
  ];

  shouldRenderQueryBuilder() {
    return this.gridPageService.schema !== undefined;
  }
}

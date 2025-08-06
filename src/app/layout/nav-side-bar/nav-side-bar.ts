import {Component, inject, Input, input, model, OnInit, ViewEncapsulation} from '@angular/core';
import {DynamicQueryCheckbox} from "app/layout/nav-side-bar/dynamic-query-checkbox/dynamic-query-checkbox";
import {ThemeToggle} from "app/layout/theme-toggle/theme-toggle";
import {GridPageService} from '@services/grid-page.service';
import {ColDef} from 'ag-grid-community';
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
  schema = input<ColDef[]>();

  ngOnInit(): void {

  }

  navLinks: NavLink[] = [
    {goTo: "", pageName: "Home"},
    {goTo: "/rockets", pageName: "Rockets"},
    {goTo: "/launches", pageName: "Launches"},
    {goTo: "/about", pageName: "About"},
  ];

  shouldRenderQueryBuilder() {
    return this.schema() !== undefined;
  }
}

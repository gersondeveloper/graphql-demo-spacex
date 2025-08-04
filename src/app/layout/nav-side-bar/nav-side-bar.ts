import {Component, inject, input, ViewEncapsulation} from '@angular/core';
import {DynamicQueryCheckbox} from "app/layout/nav-side-bar/dynamic-query-checkbox/dynamic-query-checkbox";
import {ThemeToggle} from "app/layout/theme-toggle/theme-toggle";
import {GridPageService} from '@services/grid-page.service';
import {ColDef} from 'ag-grid-community';

interface NavLink {
  goTo: string;
  pageName: string;
}

@Component({
  selector: 'app-nav-side-bar',
  imports: [
    ThemeToggle,
    DynamicQueryCheckbox
  ],
  templateUrl: './nav-side-bar.html',
  styleUrl: './nav-side-bar.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavSideBar {
  protected readonly Object = Object;
  gridPageService = inject(GridPageService);
  schema = input<ColDef>();

  onFetchSubmission(event: any) {
    event.preventDefault();
    console.log('will submit ' + this.schema);
  }

  navLinks: NavLink[] = [
    {goTo: "", pageName: "Home"},
    {goTo: "/rockets", pageName: "Rockets"},
    {goTo: "/launches", pageName: "Launches"},
    {goTo: "/about", pageName: "About"},
  ]

  shouldRenderQueryBuilder() {
    return this.schema() !== undefined;
  }
}

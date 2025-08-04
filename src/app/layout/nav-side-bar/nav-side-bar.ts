import { Component, ViewEncapsulation } from '@angular/core';
import { DynamicQueryCheckbox } from "app/layout/nav-side-bar/dynamic-query-checkbox/dynamic-query-checkbox";
import { ThemeToggle } from "app/layout/theme-toggle/theme-toggle";

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
  navLinks: NavLink[] = [
    { goTo: "", pageName: "Home" },
    { goTo: "/rockets", pageName: "Rockets" },
    { goTo: "/launches", pageName: "Launches" },
    { goTo: "/about", pageName: "About" },
  ]
}

const faggotTW = ``;

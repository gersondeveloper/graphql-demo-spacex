import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavSideBar } from "app/layout/nav-side-bar/nav-side-bar";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavSideBar
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('graphql-demo-spacex');
}
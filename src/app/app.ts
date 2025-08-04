import {Component, computed, input, OnInit, Signal, signal} from '@angular/core';
import {RouterOutlet, ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {NavSideBar} from "app/layout/nav-side-bar/nav-side-bar";
import {filter, map} from 'rxjs';
import {ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavSideBar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('graphql-demo-spacex');
  schema: ColDef | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.router
      .events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data["schema"]) {
              return child.snapshot.data["schema"];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.schema = data;
        }
      });
  }

  shouldRenderOutlet() {
    return this.schema !== null;
  }
}

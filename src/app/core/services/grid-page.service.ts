import {ColDef} from "ag-grid-community";
import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs';

@Injectable({providedIn: "root"})
export class GridPageService {
  schema: ColDef[] | undefined;
  private query: string = `
  `;

  constructor(private route: ActivatedRoute, private router: Router) {
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
          for (const schemaElement of this.schema!) {
            this.addField(schemaElement);
          }
        }
      });
  }

  addField(field: ColDef<any, any> | undefined) {
    if (field && field.field != undefined) {
      console.log("added\n" + field.field);
      this.query = this.query.concat(`${field.field}\n`);
      console.log("query: " + this.query);
    }
  }

  removeField(field: ColDef<any, any> | undefined) {
    if (field && field.field != undefined) {
      console.log("removed\n" + field?.field);
      console.log("query: " + this.query);
    }
  }
}

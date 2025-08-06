import {ColDef} from "ag-grid-community";
import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, filter, map} from 'rxjs';

class GridPageRouteData {
  schema: ColDef[] | undefined;
  queryName: string | undefined;
  queryMethod: string | undefined;
}

@Injectable({providedIn: "root"})
export class GridPageService {
  onQueryUpdated = new BehaviorSubject<boolean>(this.isFetchingAvailableCondition());
  private whichFields = new Set<string>();

  isFetchingAvailableCondition() {
    return this.whichFields && this.whichFields.size > 0;
  }

  routeData = new GridPageRouteData();
  schema: ColDef[] | undefined;
  private query: string = ``;

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
            } else if (child.snapshot.data) {
              return child.snapshot.data;
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.routeData = data;
          this.schema = data.schema;
          this.query = `
query ${this.routeData.queryName}($limit: Int, $offset: Int) {
  ${this.routeData.queryMethod}(limit: $limit, offset: $offset) {
`;
          for (const schemaElement of this.schema!) {
            this.addField(schemaElement);
          }
        }
      });
  }

  addField(field: ColDef<any, any> | undefined) {
    if (field && field.field != undefined) {
      this.whichFields.add(field.field);
      this.onQueryUpdated.next(this.isFetchingAvailableCondition());
    }
  }

  removeField(field: ColDef<any, any> | undefined) {
    if (field && field.field != undefined) {
      this.whichFields.delete(field.field);
      this.onQueryUpdated.next(this.isFetchingAvailableCondition());
    }
  }

  executeQuery() {
    console.log(this.query);
  }
}

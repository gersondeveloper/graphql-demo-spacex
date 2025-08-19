import {ColDef} from "ag-grid-community";
import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, filter, map} from 'rxjs';
import {GraphqlClientService} from '@queries/graphql.client';

class GridPageRouteData {
  schema: ColDef[] | undefined;
  queryName: string | undefined;
  queryMethod: string | undefined;
}

@Injectable({providedIn: "root"})
export class GridPageService {
  private originalSchema: ColDef[] | undefined;
  routeData = new GridPageRouteData();
  /*
   Used to access the array inside incoming data from the API.
  */
  queryMethod: string = "";
  /*
    Used to populate the query builder and the ag grid.
  */
  schema: ColDef[] | undefined;
  /*
    What will be used by the gql service's method to fetch the data.
  */
  private query: string = ``;

  // https://stackoverflow.com/questions/42694980/how-to-unflatten-a-javascript-object-in-a-daisy-chain-dot-notation-into-an-objec
  /*
    Notifies the grid and holds the payload data so it can trigger a render.
  */
  payloadSubject = new BehaviorSubject<any>(null);

  unflatten(data: { [key: string]: any }) {
    const result = {}
    for (const item in data) {
      const keys = item.split('.')
      keys.reduce((reduced: { [key: string]: any }, value, index) => {
        return reduced[value] ||
          (reduced[value] = isNaN(Number(keys[index + 1])) ?
            (keys.length - 1 == index ? data[item] : {}) : [])
      }, result)
    }
    return result
  }

  constructor(private route: ActivatedRoute, private router: Router, private graphqlClient: GraphqlClientService) {
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
          this.originalSchema = data.schema;
          this.schema = data.schema;
          this.queryMethod = data.queryMethod;
          this.resetQuery();
        }
      });
  }

  /*
    Empties the query's fields.
  */
  private resetQuery() {
    this.query = `
query ${this.routeData.queryName}($limit: Int, $offset: Int) {
  ${this.routeData.queryMethod}(limit: $limit, offset: $offset) {
`;
  }

  /*
    Fetches the data from the API and updates the behaviour subject responsible for its propagation.
  */
  executeQuery(payload: { name: string; value: boolean; }[]) {
    const reduced = payload.reduce((reduced, e) => {
      reduced[e.name] = e.value;
      return reduced;
    }, {} as { [key: string]: any });
    const unflattened = this.unflatten(reduced);

    /*
      Transforms the stringified object into a valid GraphQL query.
    */
    function sanitizeQueryString() {
      let stringifiedUnflattened = JSON.stringify(unflattened, null, 4);
      stringifiedUnflattened = stringifiedUnflattened.replaceAll(/(:\s(true)|(false))|(:)/g, "");
      stringifiedUnflattened = stringifiedUnflattened.replace("{", "");
      stringifiedUnflattened = stringifiedUnflattened.replace("\n", "");
      stringifiedUnflattened = stringifiedUnflattened.replaceAll("\"", "");
      const lastIndexOfClosingCurly = stringifiedUnflattened.lastIndexOf("}");
      return stringifiedUnflattened.substring(0, lastIndexOfClosingCurly);
    }

    let stringifiedUnflattened = sanitizeQueryString();

    this.resetQuery();

    this.query = this.query.concat(stringifiedUnflattened);
    this.query = this.query.concat("  }");
    this.query = this.query.concat("\n}");

    const payloadFields = payload.map(colDef => colDef.name);

    this.schema = this.originalSchema!
      .filter((colDef) =>
        payloadFields.includes(colDef.field!)
      );

    // console.log("matchingFields:\n", matchingFields);
    console.log(this.query);

    this.graphqlClient.query<any>(this.query, {limit: 10, offset: 1})
      .subscribe(({
          next: (res) => {
            this.payloadSubject.next(res.data);
          },
          error: (err) => {
            console.log(err);
          }
        })
      )
  }
}

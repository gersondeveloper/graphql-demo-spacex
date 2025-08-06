import {ColDef} from "ag-grid-community";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class GridPageService {
  private query: string = `
  `;

  addField(field: ColDef<any, any> | undefined) {
    console.log("added\n" + field);
  }

  removeField(field: ColDef<any, any> | undefined) {
    console.log("removed\n" + field);
  }
}

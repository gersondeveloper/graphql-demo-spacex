import {GridOptions, themeAlpine} from 'ag-grid-community';
import {LAUNCHES_COLUMN_DEFS} from '@shared/ag-grid/launches-grid.config';
import {BASE_GRID_CONFIG} from "@shared/ag-grid/base-grid.config";
import {Component} from '@angular/core';
import {GridPage} from '@shared/grid-page/grid-page';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-launches-page',
  standalone: true,
  templateUrl: "./../../shared/grid-page/grid-page.html",
  imports: [
    AgGridAngular
  ],

})
export class LaunchesPage extends GridPage {
  override gridOptions: GridOptions<any> = {
    columnDefs: LAUNCHES_COLUMN_DEFS,
    defaultColDef: BASE_GRID_CONFIG.defaultColDef,
    rowModelType: "clientSide",
    theme: themeAlpine,
    infiniteInitialRowCount: 1,
  }
}

import {ROCKETS_COLUMN_DEFS} from '@shared/ag-grid/rockets-grid.config';
import {BASE_GRID_CONFIG} from '@shared/ag-grid/base-grid.config';
import {GridOptions, themeAlpine} from 'ag-grid-community';
import {GridPage} from '@shared/grid-page/grid-page';
import {Component} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-rockets-page',
  standalone: true,
  templateUrl: "./../../shared/grid-page/grid-page.html",
  imports: [
    AgGridAngular
  ],
})
export class RocketsPageComponent extends GridPage {
  override gridOptions: GridOptions<any> = {
    defaultColDef: BASE_GRID_CONFIG.defaultColDef,
    rowModelType: "clientSide",
    theme: themeAlpine,
    infiniteInitialRowCount: 1,
  }
}

import { GridOptions, GridReadyEvent, themeAlpine } from 'ag-grid-community';
import { ROCKETS_COLUMN_DEFS } from '@shared/ag-grid/rockets-grid.config';
import { BASE_GRID_CONFIG } from '@shared/ag-grid/base-grid.config';
import { RocketService } from '@services/rockets.service';
import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {GridPageService} from '@services/grid-page.service';

@Component({
  selector: 'app-rockets-page',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './rockets-page.html',
})
export class RocketsPageComponent {
  gridOptions: GridOptions<any> = {
    columnDefs: ROCKETS_COLUMN_DEFS,
    defaultColDef: BASE_GRID_CONFIG.defaultColDef,
    rowModelType: "clientSide",
    theme: themeAlpine,
    infiniteInitialRowCount: 1,
  }

  constructor(private gridPageService: GridPageService) {}

  onGridReady(event: GridReadyEvent) {
    const offset = 0;
    const limit = 10;
  }
}

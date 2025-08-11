import { Component, inject } from '@angular/core';
import { LaunchService } from '@services/launches.service';
import { AgGridAngular } from "ag-grid-angular";
import { GridOptions, GridReadyEvent, themeAlpine } from 'ag-grid-community';
import { LAUNCHES_COLUMN_DEFS } from '@shared/ag-grid/launches-grid.config';
import { BASE_GRID_CONFIG } from "@shared/ag-grid/base-grid.config";
import {GridPageService} from '@services/grid-page.service';

@Component({
  selector: 'app-launches-page',
  standalone: true,
  imports: [
    AgGridAngular
  ],
  templateUrl: './launches-page.html',
  styleUrl: './launches-page.scss'
})
export class LaunchesPage {
  gridOptions: GridOptions<any> = {
    columnDefs: LAUNCHES_COLUMN_DEFS,
    defaultColDef: BASE_GRID_CONFIG.defaultColDef,
    rowModelType: "clientSide",
    theme: themeAlpine,
    infiniteInitialRowCount: 1,
  }

  constructor(private gridPageService: GridPageService) {
  }

  onGridReady(event: GridReadyEvent) {
    const offset = 0;
    const limit = 10;
  }
}

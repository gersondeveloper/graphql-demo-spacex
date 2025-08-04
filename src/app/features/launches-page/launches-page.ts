import { Component, inject } from '@angular/core';
import { LaunchService } from '@services/launches.service';
import { AgGridAngular } from "ag-grid-angular";
import { GridOptions, GridReadyEvent, themeAlpine } from 'ag-grid-community';
import { LAUNCHES_COLUMN_DEFS } from '@shared/ag-grid/launches-grid.config';
import { BASE_GRID_CONFIG } from "@shared/ag-grid/base-grid.config";

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
  private launchService = inject(LaunchService);
  gridOptions: GridOptions<any> = {
    columnDefs: LAUNCHES_COLUMN_DEFS,
    defaultColDef: BASE_GRID_CONFIG.defaultColDef,
    rowModelType: "clientSide",
    theme: themeAlpine,
    infiniteInitialRowCount: 1,
  }
  onGridReady(event: GridReadyEvent) {
    const offset = 0;
    const limit = 10;
    this.launchService
      .getLaunchesPaginated(limit, offset)
      .subscribe({
        next: (res) => {
          const launches = res.data?.launchesPast ?? [];
          console.log('Launches data:', launches);
          event.api.setGridOption('rowData', launches);
        },
        error: (err) => {
          console.error('Error fetching launches:', err);
        },
      });
  }
}

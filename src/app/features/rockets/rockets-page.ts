import { GridOptions, GridReadyEvent, themeAlpine } from 'ag-grid-community';
import { ROCKETS_COLUMN_DEFS } from '@shared/ag-grid/rockets-grid.config';
import { BASE_GRID_CONFIG } from '@shared/ag-grid/base-grid.config';
import { RocketService } from '@services/rockets.service';
import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-rockets-page',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './rockets-page.html',
})
export class RocketsPageComponent {
  rocketService = inject(RocketService);
  gridOptions: GridOptions<any> = {
    columnDefs: ROCKETS_COLUMN_DEFS,
    defaultColDef: BASE_GRID_CONFIG.defaultColDef,
    rowModelType: "clientSide",
    theme: themeAlpine,
    infiniteInitialRowCount: 1,
  }
  onGridReady(event: GridReadyEvent) {
    const offset = 0;
    const limit = 10;
    this.rocketService
      .getRocketsPaginated(limit, offset)
      .subscribe({
        next: (res) => {
          const rockets = res.data?.rockets ?? [];
          event.api.setGridOption('rowData', rockets);
        },
        error: (err) => {
          console.error('Error fetching rockets:', err);
        },
      })
  }
}

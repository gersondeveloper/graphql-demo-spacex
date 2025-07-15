import { Component, inject } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { ROCKETS_COLUMN_DEFS } from '@shared/ag-grid/rockets-grid.config';
import { BASE_GRID_CONFIG } from '@shared/ag-grid/base-grid.config';
import { RocketService } from '@services/rockets.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-rockets-page',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './rockets-page.html',
})
export class RocketsPageComponent {
  readonly columnDefs = ROCKETS_COLUMN_DEFS;
  readonly defaultColDef = BASE_GRID_CONFIG.defaultColDef;

  private rocketService = inject(RocketService);

  onGridReady(event: GridReadyEvent) {
    const offset = 0;
    const limit = 10;

    this.rocketService.getRocketsPaginated(limit, offset).subscribe({
      next: (res) => {
        const rockets = res.data?.rockets ?? [];
        console.log('Rockets data:', rockets);
        event.api.setGridOption('rowData', rockets);
      },
      error: (err) => {
        console.error('Error fetching rockets:', err);
      },
    });
  }
}

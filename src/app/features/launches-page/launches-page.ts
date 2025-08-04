import { Component, inject } from '@angular/core';
import { LaunchService } from '@services/launches.service';
import { AgGridAngular } from "ag-grid-angular";
import { GridReadyEvent, themeAlpine } from 'ag-grid-community';
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
  readonly columnDefs = LAUNCHES_COLUMN_DEFS;
  readonly defaultColDef = BASE_GRID_CONFIG.defaultColDef;
  theme = themeAlpine;
  private launchService = inject(LaunchService);

  onGridReady(event: GridReadyEvent) {
    const offset = 0;
    const limit = 10;

    this.launchService.getLaunchesPaginated(limit, offset).subscribe({
      next: (res) => {
        const launches = res.data?.launches ?? [];
        console.log('Launches data:', launches);
        event.api.setGridOption('rowData', launches);
      },
      error: (err) => {
        console.error('Error fetching launches:', err);
      },
    });
  }
}
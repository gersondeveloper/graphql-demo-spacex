import {GridPageService} from '@services/grid-page.service';
import {GridApi, GridOptions, GridReadyEvent, RowDataUpdatedEvent} from 'ag-grid-community';
import {Component, OnDestroy} from '@angular/core';
import {filter, Subject, takeUntil} from 'rxjs';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  templateUrl: './grid-page.html',
  imports: [
    AgGridAngular
  ],
})
export class GridPage implements OnDestroy {
  gridApi!: GridApi;
  gridOptions: GridOptions = {}
  rowData: Array<any> | undefined = undefined;
  private onGridDataAcquiredSubject = new Subject<void>();

  constructor(protected gridPageService: GridPageService) {
    this.gridPageService.payloadSubject
      .pipe(
        takeUntil(this.onGridDataAcquiredSubject),
        filter((e) => e !== null)
      )
      .subscribe((data) => this.onGridDataAcquired(data));
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  ngOnDestroy(): void {
    this.onGridDataAcquiredSubject.next();
    this.onGridDataAcquiredSubject.complete();
  }

  private onGridDataAcquired(data: { [key in string]: any[] }) {
    this.rowData = data[this.gridPageService.queryMethod];
    console.log("onGridDataAcquired", this.rowData);
    this.gridApi.setGridOption("rowData", []);
    // this.gridApi.setGridOption("rowData", this.rowData);
  }

  onRowDataUpdated(params: RowDataUpdatedEvent) {
    if (params.api.isRowDataEmpty()) return;

    const columns = params.api.getColumns();

    if (!columns) {
      return;
    }

    const rowsNodes = params.api.getRenderedNodes();

    columns.forEach(column => {
      const isColumnEmpty = !rowsNodes.some(_ => {
        const value = params.api.getColumn(column);
        return typeof value !== "undefined" && value !== null;
      });

      if (isColumnEmpty) {
        console.log("will hide column: " + column.getColDef().field);
      }

      params.api.setColumnsVisible([column], !isColumnEmpty);
    });
  }
}

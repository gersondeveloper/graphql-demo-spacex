import {GridPageService} from '@services/grid-page.service';
import {GridApi, GridOptions, GridReadyEvent} from 'ag-grid-community';
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
    gridApi: GridApi | null = null;
    gridOptions: GridOptions = {}
    rowData: Array<any> | undefined = undefined;
    private onGridDataAcquiredSubject = new Subject<void>();

    constructor(protected gridPageService: GridPageService) {

    }

    onGridReady(params: GridReadyEvent) {
        this.gridPageService.payloadSubject
            .pipe(
                takeUntil(this.onGridDataAcquiredSubject),
                filter((e) => e !== null)
            )
            .subscribe(this.onGridDataAcquired);
        this.gridApi = params.api;
    }

    ngOnDestroy(): void {
        this.onGridDataAcquiredSubject.next();
        this.onGridDataAcquiredSubject.complete();
    }

    private onGridDataAcquired(data: any) {
        this.rowData = data;
        console.log('onGridDataAcquired', data);
        this.gridApi?.setGridOption("rowData", data);
    }
}

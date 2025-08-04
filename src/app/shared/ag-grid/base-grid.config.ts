import { GridOptions } from "ag-grid-community";

export const BASE_GRID_CONFIG : GridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100
  },
  rowSelection: 'single',
  paginationPageSize: 10,
  pagination: true,
  suppressRowClickSelection: true,
  animateRows: true,
  suppressCellFocus: true
}

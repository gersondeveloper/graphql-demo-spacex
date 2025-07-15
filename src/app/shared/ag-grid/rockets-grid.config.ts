import { ColDef } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community';

export const ROCKETS_COLUMN_DEFS: ColDef[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'type', headerName: 'Type' },
  { field: 'company', headerName: 'Company' },
  { field: 'country', headerName: 'Country' },
  { field: 'first_flight', headerName: 'First Flight' },
  {
    field: 'active',
    headerName: 'Active',
    cellRenderer: (params: ICellRendererParams) => params.value ? '✅ Yes' : '❌ No'
  },
  {
    field: 'cost_per_launch',
    headerName: 'Cost / Launch ($)',
    valueFormatter: params => `$${params.value.toLocaleString()}`
  },
  {
    field: 'success_rate_pct',
    headerName: 'Success Rate (%)',
    valueFormatter: params => `${params.value}%`
  },
  { field: 'stages', headerName: 'Stages' },
  { field: 'boosters', headerName: 'Boosters' },
  {
    field: 'diameter.meters',
    headerName: 'Diameter (m)',
    valueGetter: params => params.data.diameter?.meters
  },
  {
    field: 'engines.type',
    headerName: 'Engine Type',
    valueGetter: params => params.data.engines?.type
  },
  {
    field: 'first_stage.engines',
    headerName: '1st Stage Engines',
    valueGetter: params => params.data.first_stage?.engines
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 2,
    minWidth: 300,
    cellClass: 'ag-wrap-text'
  }
];

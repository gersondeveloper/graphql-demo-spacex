import { ColDef } from 'ag-grid-community';

export const LAUNCHES_COLUMN_DEFS: ColDef[] = [
  { field: 'mission_name', headerName: 'Mission Name' },
  { field: 'launch_date_utc', headerName: 'Launch Date (UTC)' },
  { field: 'rocket', headerName: 'Rocket' },
];

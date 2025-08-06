import {Component, input} from '@angular/core';
import {DynamicQueryCheckbox} from '../dynamic-query-checkbox/dynamic-query-checkbox';
import {ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-query-builder',
  imports: [
    DynamicQueryCheckbox
  ],
  templateUrl: './query-builder.html',
  styleUrl: './query-builder.scss'
})
export class QueryBuilder {
  schema = input<ColDef[]>();

  onFetchSubmission(event: any) {
    event.preventDefault();
  }
}

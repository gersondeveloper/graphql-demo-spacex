import {Component, computed} from '@angular/core';
import {DynamicQueryCheckbox} from '../dynamic-query-checkbox/dynamic-query-checkbox';
import {GridPageService} from '@services/grid-page.service';

@Component({
  selector: 'app-query-builder',
  imports: [
    DynamicQueryCheckbox
  ],
  templateUrl: './query-builder.html',
  styleUrl: './query-builder.scss'
})
export class QueryBuilder {
  constructor(private gridPageService: GridPageService) {
  }

  computedColDef = computed(() => this.gridPageService.schema)

  onFetchSubmission(event: any) {
    event.preventDefault();
  }
}

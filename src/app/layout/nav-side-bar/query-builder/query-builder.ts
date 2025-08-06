import {Component, computed, OnDestroy, signal, WritableSignal} from '@angular/core';
import {DynamicQueryCheckbox} from '../dynamic-query-checkbox/dynamic-query-checkbox';
import {GridPageService} from '@services/grid-page.service';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-query-builder',
  imports: [
    DynamicQueryCheckbox,
    ReactiveFormsModule
  ],
  templateUrl: './query-builder.html',
  styleUrl: './query-builder.scss'
})
export class QueryBuilder implements OnDestroy {
  computedColDef = computed(() => this.gridPageService.schema);
  isSubmitEnabled: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private gridPageService: GridPageService) {
    this.gridPageService.onQueryUpdated.subscribe(this.onQueryUpdated);
  }

  ngOnDestroy(): void {
    this.gridPageService.onQueryUpdated.unsubscribe();
  }

  onQueryUpdated(canSubmit: boolean) {
    if (this.isSubmitEnabled) {
      this.isSubmitEnabled.update((_) => canSubmit);
      console.log("onQueryUpdated: " + this.isSubmitEnabled());
    }
  }

  onFetchSubmission(event: any) {
    event.preventDefault();
    this.gridPageService.executeQuery();
  }
}

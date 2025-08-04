import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-dynamic-query-checkbox',
  imports: [],
  templateUrl: './dynamic-query-checkbox.html',
  styleUrl: './dynamic-query-checkbox.scss'
})
export class DynamicQueryCheckbox {
  isChecked: boolean = true;
  queryField = input<QueryBuilderField>();
  computedQueryFieldName = computed<string>(() => this.queryField()?.displayName ?? "Not found");

  onCheckboxChanged(event: any) {
    console.log(`${this.computedQueryFieldName} is ${event.target.checked}`);
    this.isChecked = !this.isChecked;
    // buildSchema()
    // when it's checked - add to the query
    // when it's unchecked - remove from the query
    // add a way to prop drill some sort of callback that acknowledges the state change and warns the query builder about it
  }
}

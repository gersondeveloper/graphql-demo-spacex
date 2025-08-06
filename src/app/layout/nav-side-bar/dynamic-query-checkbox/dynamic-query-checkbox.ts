import {Component, computed, EventEmitter, inject, input, OnDestroy, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {GridPageService} from '@services/grid-page.service';

@Component({
  selector: 'app-dynamic-query-checkbox',
  imports: [],
  templateUrl: './dynamic-query-checkbox.html',
  styleUrl: './dynamic-query-checkbox.scss'
})
export class DynamicQueryCheckbox {
  // implement reactive form
  isChecked: boolean = true;
  colDef = input<ColDef>();
  computedQueryFieldName = computed<string>(() => this.colDef()?.headerName ?? "Not found");

  constructor(private readonly gridPageService: GridPageService) {
  }

  onCheckboxChanged(event: any) {
    this.isChecked = !this.isChecked;
    this.isChecked ? this.gridPageService.addField(this.colDef()) : this.gridPageService.removeField(this.colDef());
  }
}

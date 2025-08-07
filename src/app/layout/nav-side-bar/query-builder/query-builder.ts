import {Component, computed, OnDestroy, signal, WritableSignal} from '@angular/core';
import {DynamicQueryCheckbox} from '../dynamic-query-checkbox/dynamic-query-checkbox';
import {GridPageService} from '@services/grid-page.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {ColDef} from 'ag-grid-community';


@Component({
  selector: 'app-query-builder',
  imports: [
    DynamicQueryCheckbox,
    ReactiveFormsModule
  ],
  templateUrl: './query-builder.html',
  styleUrl: './query-builder.scss'
})
export class QueryBuilder {
  /**
   * Validates if the minimum number of checkboxes is checked in the form array.
   *
   * {@link https://stackoverflow.com/questions/69305004/how-to-validate-at-least-one-checkbox-is-selected-in-angular|source }
   *
   * @param {string} min - Minimum number of checkboxes.
   */
  minSelectedCheckboxes(min: number) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value[1])
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : {required: true};
      }

      throw new Error('formArray is not an instance of FormArray');
    };

    return validator;
  }

  computedColDef = computed(() => this.gridPageService.schema);
  private fieldsArray = new FormArray(new Array<AbstractControl>(), this.minSelectedCheckboxes(1));
  fieldsGroup: FormGroup = new FormGroup({
    fields: this.fieldsArray,
    com: new FormGroup({})
  });

  constructor(private gridPageService: GridPageService, private formBuilder: FormBuilder) {
    if (!this.gridPageService.schema) {
      throw new Error("Can't find schema");
    }

    for (const colDef of this.gridPageService.schema) {
      if (!colDef.field) continue;

      const {field} = colDef;

      if (field.includes(".") && !this.fieldsArray.get(field)) {
        const groupName = field.substring(0, field?.indexOf("."));
        this.fieldsGroup.addControl(groupName, this.formBuilder.group({}));
        continue;
      }

      // FIND A WAY TO CREATE NESTED GROUPS TO MATCH THE SHAPE OF THE MODEL
      // STRINGIFY THE FORM AND REMOVE THE VALUES SO IT TURNS INTO THE QUERY

      const formControl = this.formBuilder
        .control<[string, boolean]>([field, true]);
      this.fieldsArray.push(formControl);
      this.fieldsGroup.addControl(field, formControl);
    }

    // this.fieldsArray.controls.forEach(field => {
    //   console.log(field);
    // })

    Object.keys(this.fieldsGroup.controls).forEach(field => {
      console.log(field);
    })
  }

  onFetchSubmission(event: any) {
    event.preventDefault();
    this.gridPageService.executeQuery();
  }
}

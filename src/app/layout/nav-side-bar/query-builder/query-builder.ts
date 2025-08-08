import {ChangeDetectorRef, Component, computed, OnChanges} from '@angular/core';
import {DynamicQueryCheckbox} from '../dynamic-query-checkbox/dynamic-query-checkbox';
import {GridPageService} from '@services/grid-page.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-query-builder',
  imports: [
    DynamicQueryCheckbox,
    ReactiveFormsModule
  ],
  templateUrl: './query-builder.html',
  styleUrl: './query-builder.scss'
})
export class QueryBuilder implements OnChanges {
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
  form: FormGroup = new FormGroup({
    fields: new FormArray(new Array<AbstractControl>(), this.minSelectedCheckboxes(1)),
  });

  constructor(private gridPageService: GridPageService, private formBuilder: FormBuilder, private ref: ChangeDetectorRef) {
    if (!this.gridPageService.schema) {
      throw new Error("Can't find schema");
    }

    for (const colDef of this.gridPageService.schema) {
      if (!colDef.field) continue;

      const {field} = colDef;

      const formControl = this.formBuilder
        .control<[string, boolean]>([field, true]);
      this.addField(formControl);
      // this.form.addControl(field, formControl);
    }
  }

  ngOnChanges(changes: any): void {
    this.ref.detectChanges();
  }

  get fields() {
    return this.form.get("fields") as FormArray;
  }

  addField(formControl: AbstractControl) {
    this.fields.push(formControl);
  }

  get simpleColDefs() {
    const colDefs = this.computedColDef();

    if (!colDefs) {
      return [];
    }

    return colDefs.map(({field, headerName}) => ({
      field,
      headerName
    }));
  }

  onFetchSubmission(event: any) {
    event.preventDefault();
    // this.gridPageService.executeQuery();
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control) {
        console.log(field, control.value);
      }
    });
  }
}

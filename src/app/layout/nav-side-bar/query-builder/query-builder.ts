import {
  AfterContentInit,
  Component,
  computed,
  inject, OnDestroy,
} from '@angular/core';
import {GridPageService} from '@services/grid-page.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn
} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-query-builder',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './query-builder.html',
  styleUrl: './query-builder.scss'
})
export class QueryBuilder implements AfterContentInit, OnDestroy {
  private formStatusChangeSubscription = new Subject<void>();

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
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : {required: true};
      }

      throw new Error('formArray is not an instance of FormArray');
    };

    return validator;
  }

  private formBuilder = inject(FormBuilder);
  computedColDef = computed(() => this.gridPageService.schema);
  form: FormGroup = new FormGroup({
    fields: this.formBuilder.array([], this.minSelectedCheckboxes(1))
  });

  constructor(private gridPageService: GridPageService) {

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
    const payload = Object.keys(this.fields.controls)
      .filter(field => this.fields.get(field))
      .map(field => {
        const control = this.fields.get(field);
        return {name: this.simpleColDefs[+field].field!, value: control!.value as boolean};
      })
      .filter(a => a.value);
    this.gridPageService.executeQuery(payload);
  }

  ngAfterContentInit(): void {
    if (!this.gridPageService.schema) {
      throw new Error("Can't find schema");
    }

    for (const colDef of this.gridPageService.schema) {
      if (!colDef.field) continue;

      // const {field} = colDef;

      const formControl = this.formBuilder.control(true)
      this.addField(formControl);
      // this.form.addControl(field, formControl);
    }

    this.form
      .statusChanges
      .pipe(takeUntil(this.formStatusChangeSubscription))
      .subscribe(this.onFormChanges);
  }

  ngOnDestroy(): void {
    this.formStatusChangeSubscription.next();
    this.formStatusChangeSubscription.complete();
  }

  private onFormChanges(value: FormControlStatus) {
    console.log(value);
  }
}

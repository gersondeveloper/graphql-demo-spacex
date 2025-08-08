import {Component, input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-dynamic-query-checkbox',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-query-checkbox.html',
  styleUrl: './dynamic-query-checkbox.scss'
})
export class DynamicQueryCheckbox{
  index = input<number>();
  headerName = input<string>();
}

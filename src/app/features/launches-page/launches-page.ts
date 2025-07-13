import {Component, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {LaunchService} from '../../core/services/launches.service';

@Component({
  selector: 'app-launches-page',
  imports: [
    DatePipe
  ],
  templateUrl: './launches-page.html',
  styleUrl: './launches-page.scss'
})
export class LaunchesPage {
  private service = inject(LaunchService);

  readonly launches = signal<any[]>([]);

  constructor() {
    this.service.loadLaunches();
  }
}

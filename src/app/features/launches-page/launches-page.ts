import {Component, inject} from '@angular/core';
import {DatePipe} from '@angular/common';
import {LaunchService} from '@services/launches.service';

@Component({
  selector: 'app-launches-page',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './launches-page.html',
  styleUrl: './launches-page.scss'
})
export class LaunchesPage {
  private service = inject(LaunchService);

  // Usando os signals do serviço diretamente
  readonly launches = this.service.launches;
  readonly loading = this.service.loading;

  constructor() {
    // Carregando os dados ao inicializar o componente
    this.service.loadLaunches();
  }
}

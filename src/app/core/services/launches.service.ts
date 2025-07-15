import {inject, Injectable, signal} from '@angular/core';
import { GraphqlClientService } from '@queries/graphql.client';
import { GET_PAST_LAUNCHES } from '@queries/launches.queries';

@Injectable({ providedIn: 'root' })
export class LaunchService {
  readonly launches = signal<any[]>([]);
  readonly loading = signal(false);

  readonly service = inject(GraphqlClientService);

  loadLaunches() {
    this.loading.set(true);
    this.service.query<any>(GET_PAST_LAUNCHES, { limit: 100, offset: 0 })
      .subscribe({
        next: (response) => {
          this.launches.set(response.data.launchesPast);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error loading launches:', error);
          this.loading.set(false);
        }
      });
  }
}

import { Injectable, signal } from '@angular/core';
import { graphqlQuery } from '../graphql/graphql.client';
import { GET_PAST_LAUNCHES } from '../graphql/launches.queries';

@Injectable({ providedIn: 'root' })
export class LaunchService {
  readonly launches = signal<any[]>([]);
  readonly loading = signal(false);

  loadLaunches() {
    this.loading.set(true);
    graphqlQuery<any>(GET_PAST_LAUNCHES, { limit: 5 }).subscribe({
      next: res => {
        this.launches.set(res.data.launchesPast);
        this.loading.set(false);
        console.log('Launches loaded:', res.data.launchesPast);
      },
      error: () => this.loading.set(false),
    });
  }
}

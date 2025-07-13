import { Injectable, signal } from '@angular/core';
import {graphqlQuery} from '../graphql/graphql.client';

@Injectable({ providedIn: 'root' })
export class LaunchService {
  readonly launches = signal<any[]>([]);
  readonly loading = signal(false);

  loadLaunches() {
    this.loading.set(true);
    graphqlQuery<any>(`
      query {
        launchesPast(limit: 5) {
          mission_name
          launch_date_utc
          rocket { rocket_name }
        }
      }
    `).subscribe({
      next: res => {
        this.launches.set(res.data.launchesPast);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}

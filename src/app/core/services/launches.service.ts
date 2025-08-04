import { inject, Injectable } from '@angular/core';
import { GraphqlClientService } from '@queries/graphql.client';
import { GET_PAST_LAUNCHES } from '@queries/launches.queries';

@Injectable({ providedIn: 'root' })
export class LaunchService {

  readonly service = inject(GraphqlClientService);

  getLaunchesPaginated(limit: number, offset: number) {
    return this.service.query<any>(GET_PAST_LAUNCHES, { limit, offset });
  }
}

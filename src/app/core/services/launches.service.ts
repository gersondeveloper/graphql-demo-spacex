import { inject, Injectable } from '@angular/core';
import { GraphqlClientService } from '@queries/graphql.client';
import { GET_PAST_LAUNCHES } from '@queries/launches.queries';
import { PastLaunchResponse } from "app/core/models/response/launch-response";

@Injectable({ providedIn: 'root' })
export class LaunchService {

  readonly service = inject(GraphqlClientService);

  getLaunchesPaginated(limit: number, offset: number) {
    return this.service.query<PastLaunchResponse>(GET_PAST_LAUNCHES, { limit, offset });
  }
}

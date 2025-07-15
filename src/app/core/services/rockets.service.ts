import {inject, Injectable} from '@angular/core';
import {GraphqlClientService} from '@queries/graphql.client';
import {GET_PAGINATED_ROCKETS} from '@queries/rockets.queries';

@Injectable({ providedIn: 'root' })
export class RocketService {

  readonly service = inject(GraphqlClientService);

  getRocketsPaginated(limit: number, offset: number) {
    return this.service.query<any>(GET_PAGINATED_ROCKETS, { limit, offset })
  }
}

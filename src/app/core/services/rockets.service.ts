import {inject, Injectable} from '@angular/core';
import {GraphqlClientService} from '@queries/graphql.client';
import {GET_PAGINATED_ROCKETS} from '@queries/rockets.queries';
import {RocketResponse} from '../models/response/rocket-response';

@Injectable({ providedIn: 'root' })
export class RocketService {

  readonly service = inject(GraphqlClientService);

  getRocketsPaginated(limit: number, offset: number) {
    return this.service.query<RocketResponse>(GET_PAGINATED_ROCKETS, { limit, offset })
  }
}

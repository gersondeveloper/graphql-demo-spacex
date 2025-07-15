import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const SPACEX_API = 'https://spacex-production.up.railway.app/';

@Injectable({ providedIn: 'root' })
export class GraphqlClientService {
  constructor(private http: HttpClient) {}

  query<T>(query: string, variables?: Record<string, unknown>) {
    return this.http.post<T>(SPACEX_API, { query, variables });
  }
}

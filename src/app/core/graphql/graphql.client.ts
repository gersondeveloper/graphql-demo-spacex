import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const SPACEX_API = 'https://spacex-production.up.railway.app/';

export function graphqlQuery<T>(query: string, variables?: Record<string, unknown>) {
  const http = inject(HttpClient);
  return http.post<T>(SPACEX_API, { query, variables });
}

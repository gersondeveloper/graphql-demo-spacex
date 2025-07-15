
export const GET_PAGINATED_ROCKETS = `
  query GetAllRocketsPaginated($limit: Int!, $offset: Int!) {
  rockets(limit: $limit, offset: $offset) {
    id
    name
    type
    description
    active
    stages
    boosters
    cost_per_launch
    success_rate_pct
    first_flight
    country
    company
    diameter {
      meters
    }
    engines {
      type
    }
    first_flight
    first_stage {
      reusable
      engines
      burn_time_sec
    }
  }
}
`;

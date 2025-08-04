export const GET_PAST_LAUNCHES = `
  query GetPastLaunches($limit: Int, $offset: Int) {
    launchesPast(limit: $limit, offset: $offset) {
      mission_name
      launch_date_utc
      rocket {
        rocket_name
      }
    }
  }
`;


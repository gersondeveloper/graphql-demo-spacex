export const GET_PAST_LAUNCHES = `
  query GetPastLaunches($limit: Int!) {
    launchesPast(limit: $limit) {
      mission_name
      launch_date_utc
      rocket { rocket_name }
    }
  }
`;


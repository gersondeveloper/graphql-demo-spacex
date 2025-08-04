export interface PastLaunchResponse {
  data: {
    launchesPast: Launch[];
  }
}

interface Launch {
  mission_name: string;
  launch_date_utc: string;
  rocket: Rocket;
}

interface Rocket {
  rocket_name: string;
}

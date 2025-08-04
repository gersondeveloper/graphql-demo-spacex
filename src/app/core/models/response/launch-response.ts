export interface LaunchResponse {
  data: {
    launches: Launch[];
  }
}

interface Launch {
  mission_name: string;
  launch_date_utc: Date;
  rocket: {
    rocket_name: string;
  };
}
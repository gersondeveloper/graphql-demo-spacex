export interface RocketResponse {
  data: {
    rockets: Rocket[]
  }
}

export interface Rocket{
  id: string,
  name: string,
  type: string,
  description: string,
  active: boolean,
  stages: number,
  boosters: number,
  cost_per_launch: number,
  success_rate_pct: number,
  first_flight: string,
  country: string,
  company: string,
  diameter: Diameter,
  engines: Engines,
  first_stage: FirstStage,
}

export interface Diameter {
  meters: number;
}

export interface Engines {
  type: string
}

export interface FirstStage {
  reusable: boolean;
  engines: number;
  burn_time_sec: number | null;
}

export class Weather {
  name?: string;
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  rain?: {
    '1h': string;
    '3h': string;
  };
  snow?: {
    '1h': string;
    '3h': string;
  };
  sys: {
    pod: string;
  };
  /* tslint:disable-next-line:variable-name */
  dt_txt: string;
}

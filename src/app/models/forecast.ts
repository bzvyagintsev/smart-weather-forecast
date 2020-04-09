import { Weather } from './weather';

export class Forecast {
  cod: number;
  message: string;
  cnt: number;
  list: Weather[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: string;
      lon: string;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

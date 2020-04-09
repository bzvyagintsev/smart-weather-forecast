import { env } from 'process';

export const environment = {
  production: true,
  openWeatherKey: env.OPEN_WEATHER_KEY,
};

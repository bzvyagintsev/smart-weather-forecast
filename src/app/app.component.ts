import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { tap } from 'rxjs/internal/operators/tap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { map } from 'rxjs/internal/operators/map';
import { Weather } from './models/weather';
import { Forecast } from './models/forecast';
import { ChartData } from './models/chart-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loaded = false;

  public weather: Weather;

  public forecast: Forecast;

  public data: ChartData[] = [{ name: 'Температура', series: [] }];

  private params = { q: 'Moscow' };

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getData(this.params);
  }

  public onUpdate(value): void {
    this.params = {
      q: value,
    };

    this.getData(this.params);
  }

  private getData(params): void {
    this.weatherService
      .getWeather(params)
      .pipe(
        tap((res) => (this.weather = res)),
        mergeMap((weather) => {
          return this.weatherService.getWeatherHourly(params).pipe(
            map((forecast) => {
              return { weather, forecast };
            })
          );
        }),
        tap(({ weather, forecast }) => {
          if (weather && forecast) {
            this.loaded = true;
          }

          this.forecast = forecast;
          this.forecast.list.unshift(weather);

          const date = new Date();
          const dtTXT =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getUTCDate() +
            ' ' +
            (date.getHours() - 3) +
            ':00:00';

          this.forecast.list[0].dt_txt = dtTXT;

          this.data[0].series = [];

          this.updateChart(forecast);
        })
      )
      .subscribe();
  }

  private updateChart(arr): void {
    for (const item of arr.list.slice(0, 8)) {
      this.data[0].series.push({
        name: this.getTime(item.dt_txt),
        value: Math.round(item.main.temp),
        icon: item.weather[0].icon,
      });
    }

    this.data = [...this.data];
  }

  private getTime(value): string {
    return new Date(value).getHours() + 3 + ':00';
  }
}

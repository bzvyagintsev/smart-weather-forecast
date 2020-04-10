import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { tap } from 'rxjs/internal/operators/tap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { map } from 'rxjs/internal/operators/map';
import { Weather } from './models/weather';
import { Forecast } from './models/forecast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loaded = false;

  public weather: Weather;

  public forecast: Forecast;

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

          const temp = {...forecast};

          temp.list.unshift(weather);

          let date = new Date();
          date = new Date(date.setHours(date.getHours() - 3));

          temp.list[0].dt_txt = date.toUTCString();

          this.forecast = temp;
        })
      )
      .subscribe();
  }
}

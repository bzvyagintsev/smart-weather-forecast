import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Forecast } from '../models/forecast';
import { Weather } from '../models/weather';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  key = environment.openWeatherKey;

  options = { appid: this.key, units: 'metric', lang: 'ru' };

  public getWeather(params): Observable<Weather> {
    const url = 'https://api.openweathermap.org/data/2.5/weather';

    return this.http
      .get<Weather>(url, { params: { ...this.options, ...params } })
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  public getWeatherHourly(params): Observable<Forecast> {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';

    return this.http
      .get<Forecast>(url, { params: { ...this.options, ...params } })
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}

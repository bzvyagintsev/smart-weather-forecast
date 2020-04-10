import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AdviceService, advices } from '../services/advice.service';
import { Weather } from '../models/weather';

export interface WeatherData {
  temps: number[];
  min: number;
  max: number;
  snow: boolean;
  wind: boolean;
  rain: boolean;
};

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdviceComponent implements OnChanges {
  @Input() data: Weather[];

  advice: string[];

  constructor(private adviceService: AdviceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data?.length > 0) {
      this.advice = [];

      this.createAdvices(this.filterData(this.data));
    }
  }

  private addAdvice(adviceType: string, comment?): void {
    const advice: string = this.adviceService.getAdvice(adviceType);

    if (advice && !this.advice.includes(advice)) {
      this.advice.push(comment ? advice + comment : advice);
    }
  }

  private filterData(data): WeatherData {
    const weatherData: WeatherData = {
      temps: [],
      min: undefined,
      max: undefined,
      wind: false,
      snow: false,
      rain: false,
    };

    for (const item of data) {
      weatherData.temps.push(item.main.temp);

      if (item.rain) {
        weatherData.rain = true;
      }
      if (item.snow) {
        weatherData.snow = true;
      }
      if (Math.round(item.wind?.speed) >= 5) {
        weatherData.wind = true;
      }
    }

    weatherData.min = Math.min(...weatherData.temps);
    weatherData.max = Math.max(...weatherData.temps);

    return weatherData;
  }

  private createAdvices(data: WeatherData): void {
    if (data.min < 0) {
      this.addAdvice(data.min < -10 ? 'cold10' : 'cold');
    }

    if (data.max > 0) {
      if (data.max < 10) {
        this.addAdvice('warm');
      } else {
        this.addAdvice(data.max > 20 ? 'warm20' : 'warm10');
      }
    }

    if (data.min < data.temps[0] && data.temps[0] - data.min > 5) {
      this.addAdvice('cooling', Math.round(data.min) + ' °C.');
    }

    if (data.max > data.temps[0] && data.max - data.temps[0] > 5) {
      this.addAdvice('warmer', Math.round(data.max) + ' °C.');
    }

    if (data.rain && data.snow) {
      this.addAdvice('rainSnow');
    } else {
      if (data.rain) {
        this.addAdvice('rain');
      }
      if (data.snow) {
        this.addAdvice('snow');
      }
    }

    if (data.max < 20 && data.wind) {
      this.addAdvice('wind');
    }
  }
}

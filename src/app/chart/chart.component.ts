import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ChartData } from '../models/chart-data';
import { Forecast } from '../models/forecast';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnChanges {
  @Input() forecast: Forecast;

  public chartData: ChartData[] = [{ name: 'Температура', series: [] }];

  view = [700, 310];

  colorScheme = {
    domain: ['#5AA454'],
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.forecast && this.forecast?.list) {
      this.chartData[0].series = [];

      this.updateChart(this.forecast);
    }
  }

  private updateChart(forecast): void {
    for (const item of forecast.list.slice(0, 8)) {
      this.chartData[0].series.push({
        name: this.getTime(item.dt_txt),
        value: Math.round(item.main.temp),
        icon: item.weather[0].icon,
      });
    }

    this.chartData = [...this.chartData];
  }

  private getTime(value): string {
    return new Date(value).getHours() + 3 + ':00';
  }
}

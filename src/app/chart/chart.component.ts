import { Component, Input } from '@angular/core';
import { ChartData } from '../models/chart-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() data: ChartData[];

  view = [700, 310];

  colorScheme = {
    domain: ['#5AA454'],
  };

  constructor() {}
}

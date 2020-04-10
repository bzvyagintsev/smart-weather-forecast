import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Weather } from '../models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {
  @Input() weather: Weather;
  @Output() update = new EventEmitter();

  public days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];

  public cityControl = new FormControl(
    [],
    [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё-\\s]+$')]
  );

  constructor() {}

  public onButtonClick(): void {
    if (this.cityControl.valid) {
      this.update.emit(this.cityControl.value);
    }
  }

  public onKeyPress($event: KeyboardEvent): void {
    if ($event?.key === 'Enter') {
      this.onButtonClick();
    }
  }

  public getCurrentTime(): string {
    return new Date().getHours() + ':00';
  }

  public getToday(): string {
    return this.days[new Date().getDay()];
  }
}

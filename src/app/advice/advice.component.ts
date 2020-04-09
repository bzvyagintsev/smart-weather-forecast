import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AdviceService, advices } from '../services/advice.service';
import { Weather } from '../models/weather';

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

      this.createAdvices(this.data);
    }
  }

  private addAdvice(adviceType: string, comment?): void {
    const advice: string = this.adviceService.getAdvice(adviceType);

    if (advice && !this.advice.includes(advice)) {
      this.advice.push(comment ? advice + comment : advice);
    }
  }

  private createAdvices(data): void {
    const tempValues: number[] = [];

    for (const item of data) {
      tempValues.push(item.main.temp);

      if (item.rain) {
        this.addAdvice('rain');
      }
      if (item.snow) {
        this.addAdvice('snow');
      }
      if (Math.round(item.wind?.speed) >= 6) {
        this.addAdvice('wind');
      }
    }

    const min = Math.min(...tempValues);
    const max = Math.max(...tempValues);

    if (min < tempValues[0] && tempValues[0] - min > 5) {
      this.addAdvice('cold', Math.round(min) + ' °C.');
    }

    if (max > tempValues[0] && max - tempValues[0] > 5) {
      this.addAdvice('hot', Math.round(max) + ' °C.');
    }
  }
}

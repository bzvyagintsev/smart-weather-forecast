import { Injectable } from '@angular/core';

export const advices = {
  rain: 'Ожидается дождь, возьмите зонтик!',
  snow: 'Ожидается снег.',
  hot: 'Ожидается потепление до ',
  cold: 'Одевайтесь теплее, ожидается похолодание до ',
  wind: 'Сильный ветер, будьте аккуратны!'
};

@Injectable({
  providedIn: 'root'
})
export class AdviceService {
  public getAdvice(advice: string): string | null {
    if (advices[advice]) {
      return advices[advice];
    }

    return null;
  }
}

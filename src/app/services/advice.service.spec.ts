import { TestBed } from '@angular/core/testing';

import { AdviceService } from './advice.service';

import { advices } from './advice.service';

describe('AdviceService', () => {
  let service: AdviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return advice', () => {
    expect(service.getAdvice('wind')).toEqual(advices.wind);
    expect(service.getAdvice('rain')).toEqual(advices.rain);
    expect(service.getAdvice('snow')).toEqual(advices.snow);
    expect(service.getAdvice('rainSnow')).toEqual(advices.rainSnow);
    expect(service.getAdvice('warm')).toEqual(advices.warm);
    expect(service.getAdvice('warm10')).toEqual(advices.warm10);
    expect(service.getAdvice('warm20')).toEqual(advices.warm20);
    expect(service.getAdvice('cold')).toEqual(advices.cold);
    expect(service.getAdvice('cold10')).toEqual(advices.cold10);
    expect(service.getAdvice('warmCold')).toEqual(advices.warmCold);
    expect(service.getAdvice('warmer')).toEqual(advices.warmer);
    expect(service.getAdvice('cooling')).toEqual(advices.cooling);
  });

  it('should return null if wrong input', () => {
    expect(service.getAdvice(null)).toEqual(null);
    expect(service.getAdvice(undefined)).toEqual(null);
  });
});

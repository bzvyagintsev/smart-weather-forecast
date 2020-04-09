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
    expect(service.getAdvice('rain')).toEqual(advices.rain);
    expect(service.getAdvice('snow')).toEqual(advices.snow);
    expect(service.getAdvice('hot')).toEqual(advices.hot);
    expect(service.getAdvice('cold')).toEqual(advices.cold);
    expect(service.getAdvice('wind')).toEqual(advices.wind);
  });

  it('should return null if wrong input', () => {
    expect(service.getAdvice('adjhfjahdf')).toEqual(null);
    expect(service.getAdvice('')).toEqual(null);
    expect(service.getAdvice(null)).toEqual(null);
    expect(service.getAdvice(undefined)).toEqual(null);
    expect(service.getAdvice('true')).toEqual(null);
    expect(service.getAdvice('false')).toEqual(null);
    expect(service.getAdvice(' ')).toEqual(null);
    expect(service.getAdvice('rains')).toEqual(null);
    expect(service.getAdvice('rain, snow')).toEqual(null);
    expect(service.getAdvice('rain snow')).toEqual(null);
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('raises update event on button click', () => {
    component.update.subscribe((res: string) => expect(res).toBe('Зеленоград'));

    component.cityControl.setValue('Зеленоград');

    component.onButtonClick();
  });

  it('not raises update event on button click if input invalid', () => {
    spyOn(component.update, 'emit');

    component.cityControl.setValue(12345);

    component.onButtonClick();

    expect(component.update.emit).not.toHaveBeenCalled();
  });

  it('raises update event on enter keypress', () => {
    spyOn(component, 'onButtonClick');

    component.cityControl.setValue('Зеленоград');

    component.onKeyPress(new KeyboardEvent('keypress', {key: 'Enter'}));

    expect(component.onButtonClick).toHaveBeenCalled();
  });

  it('not raises update event on space keypress', () => {
    spyOn(component, 'onButtonClick');

    component.cityControl.setValue('Зеленоград');

    component.onKeyPress(new KeyboardEvent('keypress', {key: 'Space'}));

    expect(component.onButtonClick).not.toHaveBeenCalled();
  });

  it('should be invalid input', () => {
    component.cityControl.setValue('12345');
    expect(component.cityControl.invalid).toBeTruthy();

    component.cityControl.setValue('');
    expect(component.cityControl.invalid).toBeTruthy();

    component.cityControl.setValue('.');
    expect(component.cityControl.invalid).toBeTruthy();
  });

  it('should be valid input', () => {
    component.cityControl.setValue('Москва');
    expect(component.cityControl.valid).toBeTruthy();

    component.cityControl.setValue('Нью-Йорк');
    expect(component.cityControl.valid).toBeTruthy();

    component.cityControl.setValue('New York');
    expect(component.cityControl.valid).toBeTruthy();
  });
});

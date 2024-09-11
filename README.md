# Smart Weather Forecast Service

### Task with a star: This service is designed to help users quickly determine the weather in their locality and suggest what to wear today to feel comfortable outside.

## About the Application

### Technologies
- [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.
- TypeScript
- RxJS

### Interface
The application is a web app, without mobile optimization.

### Response Format
The weather forecast is displayed as a card and contains the following information:
- City name
- Current day of the week and time
- Description of weather conditions, e.g., "Clear"
- Icon displaying the current weather conditions
- Current temperature
- Weather condition details: wind, pressure, and humidity
- A graph showing temperature changes over 19-21 hours, with corresponding weather condition icons
- Suggestions on what to wear outside

### Demo
Check out the application demo on [YouTube](https://youtu.be/pfAJktV4UrM).

### Workflow
1. When the app starts, the weather forecast for Moscow is loaded. To get the forecast for another city, enter the city name in the "Other city" text field and click the "Update" button.
2. The city name, along with other parameters (appid, units, and lang), is added to the parameters of two GET HTTP requests to the OpenWeather API: one to get the current weather and another to get the 5-day forecast with 3-hour intervals.
3. Once the server returns the data, the Weather, Weather Forecast, and Suggestions components are updated.

## Development

### Secrets
Create a `secrets.js` file in the project root with the token for the OpenWeather API:
```bash
export const Secrets = {
  "OPEN_WEATHER_KEY": "key"
}
```

### Development Server
Run `ng serve` to start the development server. Open [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you make any changes to the source files.

### Code Generation
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Further Help
For more information on Angular CLI, use `ng help` or check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Testing

### Running TSLint
Run `ng lint` to execute the linter for TypeScript with [TSLint](https://palantir.github.io/tslint/).

### Running Unit Tests
Run `ng test` to execute the unit tests with [Karma](https://karma-runner.github.io).

### Running End-to-End Tests
The project is not covered by end-to-end tests.

Run `ng e2e` to execute the end-to-end tests with [Protractor](http://www.protractortest.org/).

## CI/CD
GitHub Actions are used for CI/CD:

- When pull requests are made to the master branch, the workflow [ingrate.yml](https://github.com/bzvyagintsev/smart-weather-forecast/blob/master/.github/workflows/integrate.yml) is triggered.
- When merged into the master branch, the workflow [deploy.yml](https://github.com/bzvyagintsev/smart-weather-forecast/blob/master/.github/workflows/deploy.yml) is triggered.

The app is deployed on Firebase: [https://smart-weather-forecast.firebaseapp.com/](https://smart-weather-forecast.firebaseapp.com/)


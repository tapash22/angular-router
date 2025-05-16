import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { importProvidersFrom } from '@angular/core';
import { provideCharts } from 'ng2-charts';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ importProvidersFrom(FontAwesomeModule),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideCharts()]
};

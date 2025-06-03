import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { provideCharts } from "ng2-charts";
import { provideAnimations } from "@angular/platform-browser/animations";
// import { provideToastr } from 'ngx-toastr';
import { ToastrModule } from "ngx-toastr";
// added router file
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      FontAwesomeModule,
      ToastrModule.forRoot({
        timeOut: 5000,
        extendedTimeOut: 0,
        closeButton: true,
        progressBar: true,
        tapToDismiss: true,
        positionClass: "toast-center-screen",
        toastClass: "toast-center-screen",
      })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCharts(),
    provideAnimations(),
  ],
};

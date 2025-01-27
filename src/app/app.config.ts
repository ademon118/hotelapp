import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



function initFactory(initService: InitService) {
  return () => initService.init();
}



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
  {
    provide: APP_SERVICE_CONFIG,
    useValue: APP_CONFIG
  },
  provideHttpClient(),
  provideClientHydration(),
  provideHttpClient(withInterceptors([requestInterceptor])),
  provideAppInitializer(() => inject(InitService).init()), provideAnimationsAsync(),

  ]

};

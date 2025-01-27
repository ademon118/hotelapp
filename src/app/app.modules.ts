import { CUSTOM_ELEMENTS_SCHEMA, NgModule,provideAppInitializer, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppConfig } from './AppConfig/appconfig.interface';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';



const appConfig: AppConfig = {
  apiEndpoint: 'http://localhost:8080/api/v1/',
  timeout: 5000,
};
@NgModule({

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ContainerComponent,
    EmployeeComponent,
    HeaderComponent,
    RoomsComponent,
    AppComponent,
    AppRoutingModule,
    RouterModule
  ],

  providers: [provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: []
})
export class AppModule { }

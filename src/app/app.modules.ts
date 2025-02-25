import { CUSTOM_ELEMENTS_SCHEMA, NgModule,provideAppInitializer, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppConfig } from './AppConfig/appconfig.interface';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { EmailValidator, FormsModule } from '@angular/forms';
import { HoverDirective } from './hover.directive';
import { EmailvalidatorDirective } from './emailvalidator/emailvalidator.directive';
//import { RoomsModule } from './rooms/rooms.module';
import { HeaderModule } from './header/header.module';



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
   // RoomsModule,
    AppRoutingModule,
    CommonModule,
    ContainerComponent,
    EmployeeComponent,
    AppComponent,
    RouterModule,
    FormsModule,
    HoverDirective,
    EmailvalidatorDirective,
    HeaderModule
  ],

  providers: [provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: []
})
export class AppModule { }

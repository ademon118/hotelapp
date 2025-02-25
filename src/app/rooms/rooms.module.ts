import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { HeaderModule } from '../header/header.module';
import { RouteConfigToken } from '../services/routeConfig.service';
import { title } from 'process';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    RoomsComponent,
    RoomsListComponent,
    RoomsAddComponent,
    RoomsBookingComponent,
    HeaderModule,
    ReactiveFormsModule
  ],
  providers :[
    {
      provide:RouteConfigToken,
      useValue :{title : 'Room'}
    }
  ]
})
export class RoomsModule { }

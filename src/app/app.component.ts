import { Component, ElementRef, OnInit, Optional, Inject,ViewChild } from '@angular/core';
import { RoomsComponent } from "./rooms/rooms.component";
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from "./employee/employee.component";
import { LoggerService } from './logger.service';
import { localstoragetoken } from './localstorage.token';
import { InitService } from './init.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hinv-root',
  imports: [RoomsComponent, CommonModule, RouterModule,ContainerComponent,EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hotel-app';

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerservice: LoggerService,
    @Inject(localstoragetoken) private localstorage: any,
    private initService : InitService
  ) { 
    {
      console.log(initService.config);
    }
  }

  ngOnInit() {
    this.name.nativeElement.innerText = "Prince Hotel";
    this.loggerservice?.log('AppComponent.ngOnInit()');
    this.localstorage.setItem('name', 'Prince Hotel');
    console.log(this.localstorage.getItem('name'));
  }
}

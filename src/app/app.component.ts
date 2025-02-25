import { Component, ElementRef, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { localstoragetoken } from './localstorage.token';
import { InitService } from './init.service';
import { NavigationEnd, NavigationStart, RouterModule } from '@angular/router';
import { AppNavComponent } from './app-nav/app-nav.component';
import { ConfigService } from './services/config.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  imports: [CommonModule, RouterModule, AppNavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hotel-app';

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerservice: LoggerService,
    @Inject(localstoragetoken) private localstorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    {
      console.log(initService.config);
    }
  }


  ngOnInit() {
    // this.router.events.subscribe((event)=>{
    //   console.log(event);
    // });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)).subscribe((event) => {
        console.log('Navigation Started');
      });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
        console.log('Navigation Completed');
      });

    this.name.nativeElement.innerText = "Prince Hotel";
    this.loggerservice?.log('AppComponent.ngOnInit()');
    this.localstorage.setItem('name', 'Prince Hotel');
    console.log(this.localstorage.getItem('name'));
  }
}

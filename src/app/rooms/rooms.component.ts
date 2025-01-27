import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from "../header/header.component";
import { ContainerComponent } from '../container/container.component';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'hinv-rooms',
  imports: [CommonModule,RoomsListComponent, HeaderComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {


  hotelname = 'Prine Hotel';

  numberOfRooms = 10;

  hiddenrooms = true;

  selectedRoom !: RoomList;


  rooms: Room = {
    totalrooms: 10,
    availablerooms: 10,
    bookedrooms: 5,
  }

  title = "Room List";


  roomList: RoomList[] = [];


  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  error: string = '';

  subscription !: Subscription;

  //catch error
  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();


  //to know how many bytes are downloaded
  totalBytes = 0;

  rooms$: Observable<any>;

  roomsCount$: Observable<any>;


  constructor(@SkipSelf() private roomsService: RoomsService) {
    this.rooms$ = this.roomsService.getRooms$.pipe(
      catchError((err) => {
        // console.log(err);
        this.error$.next(err);
        return of([]);
      })
    );


    this.roomsCount$ = this.roomsService.getRooms$.pipe(
      map((rooms) => rooms.length)
    )

  }

  @ViewChild(HeaderComponent) headerComponent !: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  ngOnInit(): void {
    //Subscription to the multiple events coming from the HttpRequest
    //call http request of photos
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response:
          {
            console.log(event.body);
          }
      }
    })

    //stream is subscribed
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    });
    this.stream.subscribe((data) => console.log(data));

    //get data of roomlist from api 
    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });
  }


  ngDoCheck(): void {
    console.log('on changes is called');
  }

  ngAfterViewInit(): void {
    this.headerComponent.Title = "Rooms View";
    this.headerChildrenComponent.last.Title = "Last Title";
    //this.headerChildrenComponent.get(0).Title = "First Title";
  }

  ngAfterViewChecked(): void {

  }

  toggle() {
    this.hiddenrooms = !this.hiddenrooms;
    this.title = "Rooms List";
  }


  selectroom(room: RoomList) {
    this.selectedRoom = room;

  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Deluxe Suite',
      amenities: 'Wi-Fi, Air Conditioning',
      price: 150,
      photo: 'https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-new-delhi/room-and-suites/deluxe-room/detail/deluxe-room-1.jpg?w=724&extension=webp&hash=b422e1c0ab876e7d8e3f6db06065c2dc',
      CheckInTime: new Date('03-Jan-2025'),
      CheckOutTIme: new Date('04-Jan-2025'),
      rating: 4.5
    }
    //this.roomList.push(room);
    // this.roomList = [...this.roomList, room];

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Suite',
      amenities: 'Wi-Fi, Air Conditioning',
      price: 150,
      photo: 'https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-new-delhi/room-and-suites/deluxe-room/detail/deluxe-room-1.jpg?w=724&extension=webp&hash=b422e1c0ab876e7d8e3f6db06065c2dc',
      CheckInTime: new Date('03-Jan-2025'),
      CheckOutTIme: new Date('04-Jan-2025'),
      rating: 4.5
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}

// getData -> addData ->getData

// getData -> continous stream of data -> addData

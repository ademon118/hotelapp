import { Inject, Injectable } from '@angular/core';
import { Room, RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { RoomsComponent } from '../rooms.component';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = [];

  getRooms$: Observable<any>;

  //readonly headers : HttpHeaders;


  constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig) {
    //pass the headers
  
    this.getRooms$ = this.http.get('/api/rooms').pipe(
      shareReplay(1)
    );
    console.log(this.config.apiEndpoint);
    console.log("room service is initialized...");
  }
  getRooms() {
    return this.http.get<RoomList[]>('./api/rooms');
  }

  addRoom(room: RoomList) {
    
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
  }

  delete(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }
  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);

  }
}

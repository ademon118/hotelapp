import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { EventManagerPlugin } from '@angular/platform-browser';
import { RoomsComponent } from '../rooms.component';


@Component({
  selector: 'hinv-rooms-list',
  imports: [CommonModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges,OnDestroy{

  @Input() rooms: RoomList[] |null= [];

  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    console.log ("on destory is called");

  }
  selectRoom(room: RoomList): void {
    this.selectedRoom.emit(room);
  }



}

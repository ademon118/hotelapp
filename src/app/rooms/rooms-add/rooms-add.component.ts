import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-rooms-add',
  imports: [FormsModule, CommonModule],
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.css'
})
export class RoomsAddComponent implements OnInit {

  successMessage: string = '';

  room: RoomList = {
    roomNumber: '',
    roomType: '',
    amenities: '',
    price: 0,
    photo: '',
    CheckInTime: new Date(),
    CheckOutTIme: new Date(),
    rating: 0,
  }

  constructor(private roomsService: RoomsService) {

  }
  ngOnInit(): void {

  }

  AddRoom(roomsForm : NgForm) {
    this.roomsService.addRoom(this.room).subscribe((data) => {
      this.successMessage = "Room Addes Successfully";
      roomsForm.resetForm({
        roomNumber: '',
        roomType: '',
        amenities: '',
        price: 0,
        photo: '',
        CheckInTime: new Date(),
        CheckOutTIme: new Date(),
        rating: 0,
      });
    });
  }
}

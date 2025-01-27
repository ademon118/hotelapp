import { CommonModule } from '@angular/common';
import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employee',
  imports : [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers : [RoomsService]
})
export class EmployeeComponent implements OnInit {

  empName : string = "John";

  ngOnInit(): void {

  }
  constructor() {

  }

}

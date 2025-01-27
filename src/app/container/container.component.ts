import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChild, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  imports : [CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
  //providers : [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit {


  @ContentChild(EmployeeComponent) Employee!: EmployeeComponent;

  constructor() {

  }
  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    console.log(this.Employee);
    this.Employee.empName = "Rick";
  }


}

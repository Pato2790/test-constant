import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-meet',
  templateUrl: './new-meet.component.html',
  styleUrls: ['./new-meet.component.sass']
})
export class NewMeetComponent implements OnInit {

  employees = new FormControl();
  employeesList: string[] = ['Employee1', 'Employee2', 'Employee3', 'Employee4', 'Employee5', 'Employee6'];

  constructor() { }

  ngOnInit(): void {
  }

}

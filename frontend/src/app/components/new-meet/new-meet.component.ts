import { EmployeeService } from './../../services/employee/employee.service';
import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { MeetService } from '../../services/meet/meet.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-meet',
  templateUrl: './new-meet.component.html',
  styleUrls: ['./new-meet.component.sass']
})
export class NewMeetComponent implements OnInit {

  employeesList: Employee[];

  constructor(private meetService: MeetService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => this.employeesList = employees);
  }

  createNewMeet(meetForm: NgForm) {
    if (meetForm.valid) {
      this.meetService.bookMeet({
        meetName: meetForm.value.meetName,
        meetDate: meetForm.value.meetDate,
        meetStart: meetForm.value.meetStart,
        meetEnd: meetForm.value.meetEnd,
        employees: meetForm.value.meetEmployees,
      }).subscribe(console.log);
    }
  }

}

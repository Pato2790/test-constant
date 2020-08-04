import { EmployeeService } from './../../services/employee/employee.service';
import { Employee } from './../../models/employee';
import { Component, OnInit, Inject } from '@angular/core';
import { MeetService } from '../../services/meet/meet.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ResponseData } from 'src/app/models/response-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-meet',
  templateUrl: './new-meet.component.html',
  styleUrls: ['./new-meet.component.sass']
})
export class NewMeetComponent implements OnInit {

  employeesList: Employee[];

  constructor(private meetService: MeetService, private employeeService: EmployeeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => this.employeesList = employees);
  }

  createNewMeet(meetForm: NgForm) {
    if (this.checkMeetTimeRange(meetForm.value.meetStart, meetForm.value.meetEnd)) {
      if (this.checkMeetTime(meetForm.value.meetStart) && this.checkMeetTime(meetForm.value.meetEnd)) {
        if (meetForm.valid) {
          this.meetService.bookMeet({
            meetName: meetForm.value.meetName,
            meetDate: meetForm.value.meetDate,
            meetStart: meetForm.value.meetStart,
            meetEnd: meetForm.value.meetEnd,
            employees: meetForm.value.meetEmployees,
          }).subscribe(response => this.openMeetResponseDialog(response.message, response.created));
        }
      } else {
        this.openWrongMeetTimeDialog();
      }
    } else {
      this.openWrongMeetTimeRangeDialog();
    }
  }

  openWrongMeetTimeRangeDialog() {
    this.dialog.open(DialogWrongMeetTimeRange);
  }

  openWrongMeetTimeDialog() {
    this.dialog.open(DialogWrongMeetTime);
  }

  openMeetResponseDialog(message, created) {
    console.log(message)

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message
    }

    if (created) {
      this.dialog.open(DialogMeetSuccessResponse, dialogConfig);
    } else {
      this.dialog.open(DialogMeetErrorResponse, dialogConfig);
    }
  }

  // Metodo auxiliar
  checkMeetTimeRange(startTime, endTime): boolean {
    const splitMeetStart = startTime.split(':');
    const splitMeetEnd = endTime.split(':');

    const newMeetStartMilisecond = new Date(new Date().setHours(splitMeetStart[0])).setMinutes(splitMeetStart[1]);
    const newMeetEndMilisecond = new Date(new Date().setHours(splitMeetEnd[0])).setMinutes(splitMeetEnd[1]);

    return (newMeetStartMilisecond < newMeetEndMilisecond) ? true : false
  }

  checkMeetTime(meetTime): boolean {
    const hoursMeetTime = parseInt(meetTime.split(':')[0]);
    const minutesMeetTime = parseInt(meetTime.split(':')[1]);

    if (hoursMeetTime >= 9) {
      if (hoursMeetTime < 18) {
        return true
      } else {
        if (hoursMeetTime === 18 && minutesMeetTime === 0) {
          return true
        }
      }
    }

    return false
  }

}

@Component({
  selector: 'dialog-wrong-meet-time-range',
  templateUrl: './dialogs/wrongMeetTimeRange.html',
})
export class DialogWrongMeetTimeRange { }

@Component({
  selector: 'dialog-wrong-meet-time',
  templateUrl: './dialogs/wrongMeetTime.html',
})
export class DialogWrongMeetTime { }

@Component({
  selector: 'dialog-meet-response',
  templateUrl: './dialogs/meetErrorResponse.html',
})
export class DialogMeetErrorResponse {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogMeetErrorResponse>) { }

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-meet-response',
  templateUrl: './dialogs/meetSuccessResponse.html',
})
export class DialogMeetSuccessResponse {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogMeetSuccessResponse>,
    private router: Router) { }

  close() {
    this.dialogRef.close();
  }

  accept() {
    this.dialogRef.close();
    this.router.navigate(['/week-calendar']);
  }
}
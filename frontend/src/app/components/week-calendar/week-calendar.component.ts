import { WeekMeets } from 'src/app/models/weekmeets';
import { MeetService } from './../../services/meet/meet.service';
import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes, format } from 'date-fns';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.sass']
})
export class WeekCalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Week;
  dayStartHour: number = 9;
  dayEndHour: number = 18;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  employeesList: Employee[] = [];

  selectedEmployees = new FormControl();

  constructor(private meetService: MeetService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.meetService.getAllMeets().subscribe(weekMeets => this.createMeetsArray(weekMeets));
    this.employeeService.getAllEmployees().subscribe(employees => this.employeesList = employees);
  }

  getMeetForEmployees() {
    if (this.selectedEmployees.value.length > 0) {
      this.employeeService.getAllMeetsByEmployee(this.selectedEmployees.value).subscribe(meetsEmployees => this.formatMeetsEmployees(meetsEmployees));
    } else {
      this.meetService.getAllMeets().subscribe(weekMeets => this.createMeetsArray(weekMeets));
    }
  }

  // Metodos auxiliares
  formatMeetsEmployees(meetsEmployees: Array<any>) {
    const allEmployeesMeets = meetsEmployees.reduce((acc, value) => {
      return acc.concat(value.Meets);
    }, []);

    this.createMeetsArray(allEmployeesMeets);
  }


  createMeetsArray(weekMeets: WeekMeets[]) {
    // Se usa como referencia para no agregar 2 veces la misma reunión
    const addedMeetsIds = [];

    const newEvents = [];

    for (const weekMeet of weekMeets) {
      if (!addedMeetsIds.includes(weekMeet.id)) {
        // Obtenemos las horas y los minutos
        const splitStartTime = weekMeet.meetStart.split(':');
        const splitEndTime = weekMeet.meetEnd.split(':');

        // Determinamos el inicio y el fin de la reunion
        const meetStartTime = setHours(setMinutes(new Date(weekMeet.meetDate), parseInt(splitStartTime[1])), parseInt(splitStartTime[0]));
        const meetEndTime = setHours(setMinutes(new Date(weekMeet.meetDate), parseInt(splitEndTime[1])), parseInt(splitEndTime[0]));

        newEvents.push({ title: weekMeet.meetName, start: meetStartTime, end: meetEndTime });

        addedMeetsIds.push(weekMeet.id);
      }
    }
    this.events = newEvents;
  }

}

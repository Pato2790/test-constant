import { WeekMeets } from 'src/app/models/weekmeets';
import { MeetService } from './../../services/meet/meet.service';
import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes, format } from 'date-fns';

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

  constructor(private meetService: MeetService) { }

  ngOnInit(): void {
    this.meetService.getAllMeets().subscribe(weekMeets => this.createMeetsArray(weekMeets));
  }

  createMeetsArray(weekMeets: WeekMeets[]) {
    const newEvents = [];
    for (const weekMeet of weekMeets) {
      // Obtenemos las horas y los minutos
      const splitStartTime = weekMeet.meetStart.split(':');
      const splitEndTime = weekMeet.meetEnd.split(':');

      // Determinamos el inicio y el fin de la reunion
      const meetStartTime = setHours(setMinutes(new Date(weekMeet.meetDate), parseInt(splitStartTime[1])), parseInt(splitStartTime[0]));
      const meetEndTime = setHours(setMinutes(new Date(weekMeet.meetDate), parseInt(splitEndTime[1])), parseInt(splitEndTime[0]));

      newEvents.push({ title: weekMeet.meetName, start: meetStartTime, end: meetEndTime })
    }
    this.events = newEvents;
  }


}

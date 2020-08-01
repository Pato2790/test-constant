import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.sass']
})
export class WeekCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  view: CalendarView = CalendarView.Week;

  dayStartHour: number = 9;
  dayEndHour: number = 18;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 3),
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 5),
    },
  ];

}

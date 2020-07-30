import { Component } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  view: CalendarView = CalendarView.Week;

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

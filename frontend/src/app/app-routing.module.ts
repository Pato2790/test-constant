import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { NewMeetComponent } from './new-meet/new-meet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'new-meet', component: NewMeetComponent },
  { path: 'week-calendar', component: WeekCalendarComponent },
  { path: '', redirectTo: '/week-calendar', pathMatch: 'full' },
  { path: '**', component: WeekCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

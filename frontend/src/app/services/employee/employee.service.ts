import { environment } from './../../../environments/environment';
import { Employee } from './../../models/employee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeekMeets } from 'src/app/models/weekmeets';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.API_URL + 'employeeManager');
  }

  getAllMeetsByEmployee(employees: Employee[]): Observable<WeekMeets[]> {
    let params = new HttpParams();
    for (let employee of employees) {
      params = params.append('employeeIds', employee.id.toString());
    }
    return this.http.get<WeekMeets[]>(environment.API_URL + 'meetManager/meetsByEmployees', { params });
  }
}

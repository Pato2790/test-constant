import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meet } from '../../models/meet';
import { WeekMeets } from 'src/app/models/weekmeets';
import { ResponseData } from 'src/app/models/response-data';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MeetService {

  constructor(private http: HttpClient) { }

  bookMeet(meet: Meet): Observable<ResponseData> {
    return this.http.post<ResponseData>(environment.API_URL + 'meetManager/', meet, httpOptions);
  }

  getAllMeets(): Observable<WeekMeets[]> {
    return this.http.get<WeekMeets[]>(environment.API_URL + 'meetManager');
  }
}

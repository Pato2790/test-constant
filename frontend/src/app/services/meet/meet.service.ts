import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meet } from '../../models/meet';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NewMeetService {

  constructor(private http: HttpClient) { }

  bookMeet(meet: Meet): Observable<string> {
    return this.http.post<string>(environment.API_URL + 'meetManager/', meet, httpOptions);
  }
}

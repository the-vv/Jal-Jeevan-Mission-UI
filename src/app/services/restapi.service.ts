import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  private URL: string = environment.production ? '' : 'http://localhost:3000/api'

  constructor(
    private http: HttpClient
  ) { }

  login(values: Object): Observable<any> {
    return this.http.post<any>(this.URL + '/login', values, {
      withCredentials: true
    })
  }

  verify(): Observable<any> {
    return this.http.post(this.URL + '/verify', null, {
      withCredentials: true 
    })
  }
  
}

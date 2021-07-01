import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application';
import { Selected } from '../models/selected';
@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  private URL: string = environment.production ? '/api' : 'http://localhost:3000/api'

  constructor(
    private http: HttpClient
  ) { }

  logout(): Observable<any> {
    return this.http.get(this.URL + '/logout', {
      withCredentials: true
    })
  }

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

  uploadFiles(files: any): Observable<any> {
    return this.http.post<any>(this.URL + '/upload', files, {
      withCredentials: true
    })
  }

  submitApplication(values: Application): Observable<Application> {
    return this.http.post<Application>(this.URL + '/application', values, {
      withCredentials: true
    })
  }

  editApplication(values: Application): Observable<Application> {
    return this.http.post<Application>(this.URL + '/applicationEdited', values, {
      withCredentials: true
    })
  }

  deleteFile(id: string): Observable<any> {
    return this.http.post<any>(this.URL + '/deleteFile', { id }, {
      withCredentials: true
    })
  }

  getApplications(query: Selected): Observable<Application[]> {
    return this.http.post<Application[]>(this.URL + '/getApplications', query)
  }


}

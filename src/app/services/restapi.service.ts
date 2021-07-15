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

  private UserUrl: string = environment.production ? 'users' : 'http://localhost:3000/users'
  private applUrl: string = environment.production ? 'applications' : 'http://localhost:3000/applications'

  constructor(
    private http: HttpClient
  ) { }

  logout(): Observable<any> {
    return this.http.get(this.UserUrl + '/logout', {
      withCredentials: true
    })
  }

  login(values: Object): Observable<any> {
    return this.http.post<any>(this.UserUrl + '/login', values, {
      withCredentials: true
    })
  }

  verify(): Observable<any> {
    return this.http.post(this.UserUrl + '/verify', null, {
      withCredentials: true
    })
  }

  uploadFiles(files: any): Observable<any> {
    return this.http.post<any>(this.applUrl + '/upload', files, {
      withCredentials: true
    })
  }

  submitApplication(values: Application): Observable<Application> {
    return this.http.post<Application>(this.applUrl + '/application', values, {
      withCredentials: true
    })
  }

  editApplication(values: Application): Observable<Application> {
    return this.http.post<Application>(this.applUrl + '/applicationEdited', values, {
      withCredentials: true
    })
  }

  deleteFile(id: string): Observable<any> {
    return this.http.post<any>(this.applUrl + '/deleteFile', { id }, {
      withCredentials: true
    })
  }

  getApplications(query: Selected): Observable<Application[]> {
    return this.http.post<Application[]>(this.applUrl + '/getApplications', query, {
      withCredentials: true
    })
  }

  getAllTargetDate(query: Selected): Observable<any[]> {
    return this.http.post<any[]>(this.applUrl + '/getClientTargets', query, {
      withCredentials: true
    })
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.UserUrl + '/getUsers', {
      withCredentials: true
    })
  }

}

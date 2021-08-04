import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Application, TargetDate } from '../models/application';
import { Selected, WardConfig } from '../models/selected';
import { ContactDetails } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  private userUrl: string = environment.production ? 'users' : 'http://localhost:3000/users'
  private applUrl: string = environment.production ? 'applications' : 'http://localhost:3000/applications'

  constructor(
    private http: HttpClient
  ) { }

  logout(): Observable<any> {
    return this.http.get(this.userUrl + '/logout', {
      withCredentials: true
    })
  }

  login(values: Object): Observable<any> {
    return this.http.post<any>(this.userUrl + '/login', values, {
      withCredentials: true
    })
  }

  verify(): Observable<any> {
    return this.http.post(this.userUrl + '/verify', null, {
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
    return this.http.get<any>(this.userUrl + '/getUsers', {
      withCredentials: true
    })
  }

  postSchedule(schedule: TargetDate): Observable<TargetDate[]> {
    return this.http.post<TargetDate[]>(this.applUrl + '/schedule', schedule, {
      withCredentials: true
    })
  }

  getSchedules(category: Selected): Observable<TargetDate[]> {
    return this.http.post<TargetDate[]>(this.applUrl + '/getSchedules', category, {
      withCredentials: true
    })
  }

  deleteSchedule(category: Selected, section: string): Observable<TargetDate[]> {
    return this.http.post<TargetDate[]>(this.applUrl + '/deleteSchedule', { category, section }, {
      withCredentials: true
    })
  }

  getContact(category: Selected): Observable<ContactDetails> {
    return this.http.post<ContactDetails>(this.userUrl + '/getContact', category, {
      withCredentials: true
    })
  }

  postContact(value: ContactDetails): Observable<any> {
    return this.http.post<any>(this.userUrl + '/contact', value, {
      withCredentials: true
    })
  }

  getWard(category: Selected): Observable<WardConfig> {
    return this.http.post<WardConfig>(this.userUrl + '/getWard', category, {
      withCredentials: true
    })
  }

  postWard(value: WardConfig): Observable<any> {
    return this.http.post<any>(this.userUrl + '/ward', value, {
      withCredentials: true
    })
  }

}

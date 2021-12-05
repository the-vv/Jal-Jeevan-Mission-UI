import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Application, ClaimDetailsType, TargetDate } from '../models/application';
import { GpConfig, Selected, WardConfig } from '../models/selected';
import { ContactDetails, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  private userUrl: string = environment.production ? 'api/users' : 'http://localhost:3000/api/users'
  public applUrl: string = environment.production ? 'api/applications' : 'http://localhost:3000/api/applications'
  public commonUrl: string = environment.production ? 'api/commons' : 'http://localhost:3000/api/commons'

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
      withCredentials: true,
      reportProgress: true,
      observe: 'events'
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

  deleteBulkFiles(ids: string[]): Observable<any> {
    return this.http.post<any>(this.applUrl + '/deleteFiles', ids, {
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

  getAllSchedules(): Observable<TargetDate[]> {
    return this.http.get<TargetDate[]>(this.applUrl + '/getAllSchedules', {
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

  postGpConfigs(value: any): Observable<any> {
    return this.http.post<any>(this.applUrl + '/gpConfigs', value, {
      withCredentials: true
    })
  }

  getGpConfigs(): Observable<GpConfig[]> {
    return this.http.get<any>(this.applUrl + '/gpConfigs', {
      withCredentials: true
    })
  }

  sendEmail(user: User): Observable<any> {
    return this.http.post<any>(this.userUrl + '/sendEmail', user,  {
      withCredentials: true
    })
  }

  verifyOtp(otp: any): Observable<any> {
    return this.http.post<any>(this.userUrl + '/verifyOtp', otp,  {
      withCredentials: true
    })
  }

  //method to send user to create user
  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.userUrl + '/createUser', user,  {
      withCredentials: true
    })
  }

  //method to send user to edit
  editUser(user: User): Observable<any> {
    return this.http.post<any>(this.userUrl + '/updateUser', user,  {
      withCredentials: true
    })
  }

  // method to delete user
  deleteUser(userId: string): Observable<any> {
    return this.http.post<any>(this.userUrl + '/deleteUser', {id: userId},  {
      withCredentials: true
    })
  }

  // get gp config from route 'api/commons/gpInfo'
  getGpInfo(): Observable<{gps: any, name: string}> {
    return this.http.get<{gps: any, name: string}>(this.commonUrl + '/gpInfo', {
      withCredentials: true
    })
  }

  // get claim details via category data post
  getClaimDetails(category: Selected): Observable<ClaimDetailsType> {
    return this.http.post<ClaimDetailsType>(this.applUrl + '/getClaimDetails', category, {
      withCredentials: true
    })
  }

  saveClaimDetails(data: ClaimDetailsType): Observable<any> {
    return this.http.post<any>(this.applUrl + '/claimDetails', data, {
      withCredentials: true
    })
  }

  // get all claimdetails
  getAllClaimDetails(): Observable<ClaimDetailsType[]> {
    return this.http.get<ClaimDetailsType[]>(this.applUrl + '/getAllClaimDetails', {
      withCredentials: true
    })
  }


}

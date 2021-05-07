import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { DataService } from './data.service';
import { RestapiService } from './restapi.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!: User;
  userChange: BehaviorSubject<any> = new BehaviorSubject(null);
  isloggedin: boolean = false

  constructor(
    private rest: RestapiService,
    private data: DataService
  ) { }

  login(cred: Object) {
    return new Promise<any>((resolve, reject) => {
      this.rest.login(cred)
        .subscribe(res => {
          this.userChange.next(res.user);
          this.isloggedin = true;
          this.currentUser = res.user;
          if (!this.currentUser.admin) {
            if (!this.currentUser.district || !this.currentUser.panchayath) {
              return reject({ error: true, status: "A critical error occured, Please contact administrators, \ncode: E_DB_DATA_MISMATCH" })
            }
            this.data.selectedDetails = {
              district: this.currentUser.district,
              gp: this.currentUser.panchayath
            }
          }
          resolve({ admin: this.currentUser.admin })
        },
          error => {
            reject(error)
          })
    })
  }
}

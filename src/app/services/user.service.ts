import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { DataService } from './data.service';
import { RestapiService } from './restapi.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User | null = null;
  userChange: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  isloggedin: boolean = false;
  isAdmin: boolean = false;
  isVerifiedAdmin: boolean = environment.production ? false : true;

  constructor(
    private rest: RestapiService,
    private data: DataService,
    private router: Router
  ) { }

  logout() {
    this.rest.logout().toPromise()
      .then(() => {
        this.userChange.next(null);
        this.isloggedin = false;
        this.isAdmin = false;
        this.currentUser = null;
        this.data.selectedDetails = {}
        this.isVerifiedAdmin = false;
        this.router.navigate(['login']);
        this.data.clearUserData();
      })
      .catch((e) => {
        console.log(e)
      })
  }

  checkLogin() {
    return new Promise<any>((resolve, reject) => {
      this.rest.verify()
        .subscribe(res => {
          if (res.error) {
            return reject(res.status)
          }
          this.userChange.next(res);
          this.isloggedin = true;
          this.isAdmin = res.admin;
          this.currentUser = res as User;
          if (!this.currentUser.admin) {
            if (!this.currentUser.district || !this.currentUser.panchayath) {
              return reject({ error: true, status: "A critical error occured, Please contact administrators, \ncode: E_DB_DATA_MISMATCH" })
            }
            this.data.selectedDetails = {
              district: this.currentUser.district,
              gp: this.currentUser.panchayath
            }
            console.log(this.data.selectedDetails)
          }
          resolve({ admin: this.currentUser.admin })
        },
          error => {
            reject(error)
          })
    })
  }

  login(cred: Object) {
    return new Promise<any>((resolve, reject) => {
      this.rest.login(cred)
        .subscribe(res => {
          if (res.error) {
            return reject(res.status)
          }
          this.userChange.next(res);
          this.isloggedin = true;
          this.isAdmin = res.admin;
          this.currentUser = res as User;
          if (!this.currentUser.admin) {
            if (!this.currentUser.district || !this.currentUser.panchayath) {
              return reject({ error: true, status: "A critical error occured, Please contact administrators, \ncode: E_DB_DATA_MISMATCH" })
            }
            this.data.selectedDetails = {
              district: this.currentUser.district,
              gp: this.currentUser.panchayath
            }
            console.log(this.data.selectedDetails)
          }
          resolve({ admin: this.currentUser.admin })
        },
          error => {
            reject(error)
          })
    })
  }
}

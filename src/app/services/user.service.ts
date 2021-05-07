import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RestapiService } from './restapi.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: Object = {}
  userChange: BehaviorSubject<any> =  new BehaviorSubject(null)

  constructor(
    private rest: RestapiService
  ) { }

  login(cred: Object) {
    return new Promise((resolve, reject) => {
      this.rest.login(cred)
      .subscribe(user => {
        this.userChange.next(user);
        resolve(user)
      },
      error => {
        reject(error)
      })
    })
  }
}

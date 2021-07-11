import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  allUsers: any[] = [];
  adminUsers: any[] = [];
  clientUsers: any[] = [];

  constructor(
    public rest: RestapiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.rest.getUsers().subscribe(res => {
      this.allUsers = res.user;
      this.adminUsers = this.allUsers.filter(el => el.admin);
      this.clientUsers = this.allUsers.filter(el => !el.admin);
      console.log(this.adminUsers);
      console.log(this.clientUsers);
    }, err => {      
      // console.log(err);      
      this.snackBar.open(err.statusText ? err.statusText + ', Please try again later' : err, 'Dismiss', { duration: 5000 })
    })
  }

}

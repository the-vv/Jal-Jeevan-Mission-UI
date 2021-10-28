import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../services/data.service';
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

  allDistricts = Object.keys(this.data.AllDataWithCount);
  selectedDistrict: string = '';

  allGps: any[] = [];
  allComponents: any[] = [];

  selectedGps: string[] = []
  selectedComponents: string[] = []

  constructor(
    public rest: RestapiService,
    private snackBar: MatSnackBar,
    public data: DataService
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

  onDistrictSelect() {
    this.allGps = Object.keys(this.data.AllDataWithCount[this.selectedDistrict]).map(el => { return {value: el} })
    this.allComponents = []
    Object.keys(this.data.phaseComponents).forEach (key => {
      for(let comp of this.data.phaseComponents[key]) {
        this.allComponents = [{
          component: `${comp[0]} - ${key}`
        }, ...this.allComponents]
      }
    })
    console.log(this.allComponents)
  }

}

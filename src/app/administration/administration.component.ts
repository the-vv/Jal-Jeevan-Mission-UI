import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../services/data.service';
import { RestapiService } from '../services/restapi.service';
import { GpConfig, Selected } from '../models/selected'

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

  selectedGps: any[] = []
  selectedComponents: any[] = []

  allConfigurations: GpConfig[] = [];

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
    if(!this.selectedDistrict) {
      this.allComponents = []
      this.allGps = []
      return;
    }
    this.allGps = Object.keys(this.data.AllDataWithCount[this.selectedDistrict]).map(el => { return { value: el } })
    this.allComponents = []
    Object.keys(this.data.phaseComponents).forEach(key => {
      for (let comp of this.data.phaseComponents[key]) {
        this.allComponents = [{
          label: `${comp[0]} (${key})`,
          phase: key,
          component: comp[0]
        }, ...this.allComponents]
      }
    })
  }

  onSaveChanges() {
    this.allConfigurations = [];
    for (let gp of this.selectedGps) {
      let components: Selected[] = [];
      for (let comp of this.selectedComponents) {
        components.push({
         phase: comp.phase,
         component: comp.component
        })
      }
      this.allConfigurations.push({
        category: {
          district: this.selectedDistrict,
          gp: gp.value
        },
        allowedComponents: [...components],
        isWholeDisabled: false
      })
    }
    console.log(this.allConfigurations);
  }

}

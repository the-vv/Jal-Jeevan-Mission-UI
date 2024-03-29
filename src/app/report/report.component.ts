import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  DistrictsList: string[] = [];
  selectedDistricts: string[] = [];

  allPhases: any = {};
  phaseComponents: string[] = [];
  SelectedPhases: string[] = [];
  
  allComponents: any[] = [];
  availableComponents: any[] = [];
  selectedComponents: string[] = [];

  allGps: any;
  availableGps: string[] = [];
  selectedGps: string[] = [];

  configData: any = environment;

  isAdminUser: boolean = this.user.isAdmin;
  
  constructor(
    public data: DataService,
    public user: UserService
  ) { }

  ngOnInit(): void {
    this.DistrictsList = this.data.getDistricts();
    for (const phase in this.data.phaseComponents) {
      if (Object.prototype.hasOwnProperty.call(this.data.phaseComponents, phase)) {        
        this.phaseComponents.push(phase);
        this.allPhases[phase] = [];
        for (const comp of (this.data.phaseComponents as any)[phase]) {
          this.allPhases[phase].push({comp: comp[0], phase});
          // this.allComponents.push(comp[0]);
        }
      }
    }
    this.allGps = this.data.getAllGps();
    // the current user us not admin, add selected district and gp from data.selected details
    if(!this.isAdminUser) {
      this.selectedDistricts = [this.data.selectedDetails.district];
      this.selectedGps = [this.data.selectedDetails.gp];
    }
    // this.selectedDistricts = this.DistrictsList;
    // this.onSelectDistrict();
    // this.selectedGps = this.availableGps;
    // this.SelectedPhases = Object.keys(this.allPhases);
    // this.onSelectPhase();
    // this.selectedComponents = this.availableComponents;
  }

  onSelectDistrict() {
    this.availableGps = []
    for(let dist of this.selectedDistricts) {
      for(let gdist in this.allGps) {
        if(dist === gdist) {
          this.availableGps = [...this.availableGps, ...this.allGps[gdist]]
        }
      }
    }
    this.availableGps.sort();
  }

  onSelectPhase() {
    this.availableComponents = [];
    // console.log(this.SelectedPhases);
    // console.log(this.allPhases)
    for(let phase of this.SelectedPhases) {
      for(let aphase in this.allPhases) {
        if(phase === aphase) {
          this.availableComponents = [...this.availableComponents, ...this.allPhases[aphase]]
        }
      }
    }
    console.log(this.allGps)
  }
  
  onSelectComponent(e) {    
  }

  checkGpInDistrict(district: string, gp: string) {
    if(this.allGps[district].includes(gp)) {
      return true;
    }
    return false;
  }

}

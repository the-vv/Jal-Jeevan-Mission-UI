import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../configs/app-config.enum';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.scss']
})
export class ReportHomeComponent implements OnInit {

  DistrictsList: string[] = [];
  selectedDistricts: string[] = [];

  allPhases: any = {};
  phaseComponents: string[] = [];
  SelectedPhases: string[] = [];
  
  allComponents: string[] = [];
  availableComponents: string[] = [];
  selectedComponents: string[] = [];

  allGps: any;
  availableGps: string[] = [];
  selectedGps: string[] = [];

  configData: any = AppConfig;
  
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
          this.allPhases[phase].push(comp[0]);
          this.allComponents.push(comp[0]);
        }
      }
    }
    this.allGps = this.data.getAllGps();
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
    console.log(this.SelectedPhases);
    console.log(this.allPhases)
    for(let phase of this.SelectedPhases) {
      for(let aphase in this.allPhases) {
        if(phase === aphase) {
          this.availableComponents = [...this.availableComponents, ...this.allPhases[aphase]]
        }
      }
    }
  }
  
  onSelectComponent(e) {    
  }

}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.scss']
})
export class ReportHomeComponent implements OnInit {

  public DistrictsList: string[] = []
  public district: string = '';
  
  public gramaPanchataths: string[] = []
  public gPanchayath: string = ''

  phaseComponents: string[] = [];
  SelectedPhase: string = '';
  
  allComponents: string[] = [];
  selectedComponents: string[] = [];
  
  constructor(
    public data: DataService
  ) { }

  ngOnInit(): void {
    this.DistrictsList = this.data.getDistricts();
    for (const phase in this.data.phaseComponents) {
      if (Object.prototype.hasOwnProperty.call(this.data.phaseComponents, phase)) {        
        this.phaseComponents.push(phase);
        for (const comp of (this.data.phaseComponents as any)[phase]) {
          this.allComponents.push(comp[0])
        }
      }
    }
  }

  onSelectDistrict() {
    if (this.district) {
      this.gramaPanchataths = this.data.getGPs(this.district)
    }
  }
  
  onSelectComponent(e) {
    console.log(e.value)

  }

}

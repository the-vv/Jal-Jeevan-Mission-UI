import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TargetDate } from '../models/application';
import { Selected } from '../models/selected';
import _ from 'lodash';
import { RestapiService } from './restapi.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedDetails: Selected = {};
  allGramaPanchayaths = {};
  targetUrl: string = null;
  targetsWarningShown: boolean = false;
  clientSchedules: TargetDate[] = [];
  schedulesFetched: boolean = false;

  AllDataWithCount = {
    Idukki: {
      Adimali: 21,
      Konnathady: 19,
      Ayyappancoil: 13,
      Chakkupallam: 15,
      Erattayar: 14,
      Rajakumari: 13,
      Santhanpara: 13,
      Vazhathoppu: 14
    },
    Kottayam: {
      Ayarkunnam: 20,
      Elikkulam: 16,
      Kooroppada: 17,
      Pambadi: 20
    },
    Ernakulam: {
      Kavalangad: 18,
      Pallarimangalam: 13,
      Nellikkuzhy: 21,
      Pindimana: 13,
      Maneed: 13,
      Mazhuvannoor: 19,
      Payipra: 22,
      Ramamangalam: 13
    },
    Pathanamthitta: {
      Enadimangalam: 15,
      Erathu: 17,
      Naranamoozhy: 13,
      'Ranni Angadi': 13,
      'Ranni Pazhavangadi': 17,
      Vechoochira: 15
    }
  }

  phaseComponents = {
    'Planning Phase': [
      ['ISA Positioning', 'planningphase/isapositioning'],
      ['Orientation to GP & Staff, Special Board Meeting', 'planningphase/orientationtogp'],
      ['GP IEC', 'planningphase/gpiec'],
      ['Community Orientation', 'planningphase/communityorientation'],
      ['GP action plan except DER', 'planningphase/gpactionplanexceptder'],
      ['GP Board meetting for Gramasabha', 'planningphase/gpboardmeettingforgramasabha'],
      ['Gramasabha action plan approved', 'planningphase/gramasabhaactionplanapproved'],
      ['GPWSC & GP Board meetting', 'planningphase/gpwscgpboardmeetting'],
      ['Beneficiary contribution Collection', 'planningphase/beneficiarycontributioncollection']
    ]
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: RestapiService
  ) {
  }

  getSectionSchedule(section: string): Promise<TargetDate> {
    return new Promise((resolve, reject) => {
      if(!this.schedulesFetched) {
        this.rest.getSchedules(this.selectedDetails)
        .subscribe(res => {
          this.schedulesFetched = true;
          this.clientSchedules = res;
          return resolve(_.find(this.clientSchedules, { section }))
        })
      } else {        
       return resolve(_.find(this.clientSchedules, { section }))
      }
    })
  }

  getWardCount(): number {
    if (this.selectedDetails.district && this.selectedDetails.gp) {
      if (!environment.production) {
        return 2
      }
      return this.AllDataWithCount[this.selectedDetails.district][this.selectedDetails.gp];
    } else {
      return 1
    }
  }

  getGPs(district: string): string[] {
    return Object.keys(this.AllDataWithCount[district]).sort();
  }

  getDistricts(): string[] {
    return Object.keys(this.AllDataWithCount).sort()
  }

  selectComponent(phaseComponent: string): string {
    let [phase, component] = phaseComponent.split('/');
    this.selectedDetails.phase = phase;
    this.selectedDetails.component = component;
    for (const ph in this.phaseComponents) {
      if (Object.prototype.hasOwnProperty.call(this.phaseComponents, ph)) {
        if (phase != ph) {
          continue;
        }
        for (const comp of (this.phaseComponents as any)[ph]) {
          if (comp[0] === component) {
            return comp[1];
          }
        }
      }
    }
    return ''
  }

  getLongName(name: string): string {
    for (const ph in this.phaseComponents) {
      if (Object.prototype.hasOwnProperty.call(this.phaseComponents, ph)) {
        for (const comp of (this.phaseComponents as any)[ph]) {
          if (comp[1] === name) {
            return comp[0];
          }
        }
      }
    }
    return ''
  }

  getWardList(gp: string) {
    console.log(this.selectedDetails);

  }

}

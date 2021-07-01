import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Selected } from '../models/selected';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedDetails: Selected = {};
  allGramaPanchayaths = {}

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
      ['ISA Positioning', 'isapositioning'],
      ['Orientation to GP & Staff, Special Board Meeting', 'orientationtogp'],
      ['GP IEC', 'gpiec'],
      ['Community Orientation', 'communityorientation'],
      ['GP action plan except DER', 'gpactionplanexceptder'],
      ['GP Board meetting for Gramasabha', 'gpboardmeettingforgramasabha'],
      ['Gramasabha action plan approved', 'gramasabhaactionplanapproved'],
      ['GPWSC & GP Board meetting', 'gpwscgpboardmeetting'],
      ['Beneficiary contribution Collection', 'beneficiarycontributioncollection']
    ]
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  getWardCount(): number {
    if(this.selectedDetails.district && this.selectedDetails.gp) {      
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

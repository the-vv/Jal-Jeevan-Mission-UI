import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Selected } from '../models/selected';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedDetails: Selected = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  getGPs(district: string): string[] {
    switch (district) {
      case "Idukki":
        return [
          "Adimali",
          "Ayyappancoil",
          "Chakkupallam",
          "Irattayar",
          "Konnathadi",
          "Rajakumari",
          "Santhanpara",
          "Vazhathoppu"
        ]
      // break;
      case "Ernakulam":
        return [
          "Pallarimangalam",
          "Kalavangadu",
          "Maneed",
          "Mazhuvannoor",
          "Nellikuzhy",
          "Paipra",
          "Pindimana",
          "Ramamangalam"
        ]
      // break
      case "Kottayam":
        return [
          "Ayarkunnam",
          "Elikulam",
          "Kooroppada",
          "Pampady"
        ]
      // break
      case "Pathanamthitta":
        return [
          "Enadimangalam",
          "Erathu",
          "Naranamoozhy",
          "Ranni Angadi",
          "Ranni Pazhavangadi",
          "Vechoochira"
        ]
      // break
      default:
        return []
      // break;
    }
  }

  getDistricts(): string[] {
    return [
      "Idukki",
      "Ernakulam",
      "Kottayam",
      "Pathanamthitta"
    ]
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

}

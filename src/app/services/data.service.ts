import { Injectable } from '@angular/core';
import { TargetDate } from '../models/application';
import { Selected, WardConfig } from '../models/selected';
import _ from 'lodash';
import { RestapiService } from './restapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  scheduleApiNotificationshow: boolean = true;
  isSidebarOpened: boolean = false;
  wardCongigData: WardConfig = null;

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
    ],
    'IEC/BCC/IPC activities': [
      ['Wall Writings/ Paintings', 'iec-activities/wall-paintings']
    ]
  }

  constructor(
    private rest: RestapiService,
    private snackbar: MatSnackBar
  ) {
  }

  getSectionSchedule(section: string) {
    if (!this.schedulesFetched) {
      if (this.scheduleApiNotificationshow) {
        this.snackbar.open('Loading Schedules..., Please try again later', 'Dismiss', { duration: 5000 });
        this.scheduleApiNotificationshow = false;
        setTimeout(() => {
          this.scheduleApiNotificationshow = true;
        }, 10000);
      }
      return -1
    }
    return _.find(this.clientSchedules, { section, category: this.selectedDetails })
  }

  getAllSchedules(): Promise<TargetDate[]> {
    return new Promise((resolve, reject) => {
      this.rest.getSchedules(this.selectedDetails)
        .subscribe(res => {
          this.schedulesFetched = true;
          this.clientSchedules = res;
          resolve(res)
        }, err => {
          this.schedulesFetched = true;
          this.snackbar.open(err.error.status || err.statusText, 'Dismiss', { duration: 5000 });
          reject(err)
        })
    })
  }

  getWardCount(): number {
    if (this.selectedDetails.district && this.selectedDetails.gp) {
      // if (environment.production) {
      //   return 2
      // }
      return this.AllDataWithCount[this.selectedDetails.district][this.selectedDetails.gp];
    } else {
      return 1
    }
  }

  getGPs(district: string): string[] {
    return Object.keys(this.AllDataWithCount[district]).sort();
  }

  getAllGps() {
    let agps: any = {};
    for (let d in this.AllDataWithCount) {
      agps[d] = [];
      for (let gp in this.AllDataWithCount[d]) {
        agps[d].push(gp);
      }
    }
    return agps;
  }

  getDistricts(): string[] {
    return Object.keys(this.AllDataWithCount).sort()
  }

  selectComponent(phaseComponent: string): string {
    // console.log(phaseComponent);
    let [phase, component] = phaseComponent.split('~');
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


  clearUserData() {
    this.scheduleApiNotificationshow = true;
    this.clientSchedules = [];
    this.targetsWarningShown = false;
    this.wardCongigData = null;
  }

  printContentByDiv(divId: string, style: string = '') {
    setTimeout(() => {
      let printWindow = window.open('', 'PRINT');

      printWindow.document.write('<html><head><title>' + document.title + '</title>');
      printWindow.document.write(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">`);
      printWindow.document.write(`<style>${style}</style>`)
      printWindow.document.write('</head><body class="text-center">');
      printWindow.document.write(document.getElementById(divId).innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.write(`<script type="text/javascript">
        window.addEventListener(
          'DOMContentLoaded',
            function() {
              window.print();
              window.close();
            });
        </script>`
      );

      printWindow.document.close(); // necessary for IE >= 10
      printWindow.focus(); // necessary for IE >= 10*/

      // mywindow.print();
      // mywindow.close();
    });
  }

}

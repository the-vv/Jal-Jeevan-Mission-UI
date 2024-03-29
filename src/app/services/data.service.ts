import { Injectable } from '@angular/core';
import { TargetDate } from '../models/application';
import { Selected, WardConfig } from '../models/selected';
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
  wardConfigData: WardConfig = null;
  allDataWithCountData: any = {};
  appName: string = ''

  constructor(
    private rest: RestapiService,
    private snackbar: MatSnackBar
  ) { }

  get allDataWithCount() {
    return this.allDataWithCountData;
  }

  phaseComponents = {
    'IEC/BCC/IPC activities': [
      ['Wall Writings/ Paintings', 'iec-activities/wall-paintings'],
      ['Hoardings/ Banners', 'iec-activities/hoardings-banners'],
      ['Radio jingles', 'iec-activities/radio-jingles'],
      ['TV spots', 'iec-activities/tv-spots'],
      ['Flipbooks/ charts', 'iec-activities/flipbooks-charts'],
      ['Posters at tourist locations', 'iec-activities/posters-tourist-locations'],
      ['Schools', 'iec-activities/schools'],
      ['Anganwadi centers', 'iec-activities/anganawadi-centers'],
      ['GP buildings', 'iec-activities/gp-buildings'],
      ['Laboratories', 'iec-activities/laborotaries'],
      ['PHE offices', 'iec-activities/phe-offices'],
      ['Announcement vans', 'iec-activities/announcement-vans'],
      ['Other Activities', 'iec-activities/other-activities'],
      ['Water resource mapping exercise', 'iec-activities/water-resource-mapping-exercise'],
      ['Water Audit/ budget exercise', 'iec-activities/water-audit-budget-exercise'],
      ['Nukkad natak/ drama/ streetplay', 'iec-activities/nukkad-natak-drama-streetplay'],
      ['Folksongs/ Kalajatha', 'iec-activities/folksongs-kalajatha'],
      ['Rallies', 'iec-activities/rallies'],
      ['Grama sabhas/ Development seminar', 'iec-activities/grama-sabhas-development-seminar'],
      ['VAP preperation & approval', 'iec-activities/vap-preperation-approval'],
      ['PRA Activities', 'iec-activities/pra-activities'],
      ['School competitions', 'iec-activities/school-competitions'],
      ['SHG involvement', 'iec-activities/shg-involvement'],
      ['Water safety planning exercise', 'iec-activities/water-safety-planning-exercise'],
      ['Others', 'iec-activities/others'],
      ['World Water day events', 'iec-activities/world-water-day-events'],
      ['Exhibitions', 'iec-activities/exhibitions'],
      ['Conference on innovation/ Events', 'iec-activities/conference-innovation-events'],
      ['IPC Activities', 'iec-activities/ipc-activities'],
      ['IEC material preparation, production & dissemination', 'iec-activities/iec-material-preperation-production-dissemination'],
    ],
    'Engagements of ISAs': [
      ['ISA Positioning', 'engagement-isa/isa-positioning'],
      ['Orientation to GP board members, socio political leaders', 'engagement-isa/orientation-to-gp-board-members'],
      ['Special orientation training for key stake holders suchas socio, political and Oppenion leaders, at GP/ Village level', 'engagement-isa/special-orientation-training'],
      ['To develop a convergence plan for GWR, RWH and gray water management and its facilitation', 'engagement-isa/develop-covergence-plan-gwr-rwh'],
      ['Assisting nodal agency/GP/GPWSC', 'engagement-isa/assisting-model-agency-gp-gpwc'],
      ['Support Services to GP', 'engagement-isa/support-services-to-gp'],
      ['Handhold support to GP/GPWSC/GP level beneficiary committee and scheme managing team and submission of project completion report', 'engagement-isa/handhold-support-gp-gpwc-gp-level-beneficiary-committee'],
    ],
    'WQM& S- Training and Capacity Building': [
      ['GP and its sub-committees', 'wqms-trainging/gp-sub-commities'],
      ['WQMS- ISAs, PRIs etc', 'wqms-trainging/wqms-isa-pri']
    ],
    'Documentation': [
      ['Documentation of General Activities', 'documentation/documentation-general-activities']
    ],
    'Social Audits': [
      ['Social Audit reports', 'social-audits/social-audit-reports']
    ],
    'WQM& S - IEC Activities': [
      ['Display of water quality testing laboratory details in prominent locations in villages', 'wqms-iec-activities/display-water-quality-testing'],
      ['Awareness generation on water quality issues, water-borne diseases and health', 'wqms-iec-activities/awareness-generation-water-quality'],
      ['Water safety planning', 'wqms-iec-activities/water-safety-plannig'],
      ['Behavioural change communication', 'wqms-iec-activities/behavioral-change-communication'],
      ['Audio-visual publicity on ill effects of consuming contaminated water, process of getting water quality sources tested,importanceof sanitary inspection, etc', 'wqms-iec-activities/audio-visual-publicity'],
      ['Wall writings promoting tapwater', 'wqms-iec-activities/wall-writing-promoting-tapwater'],
      ['Slogans,group meeting, streetplays, PRA activities, exhibits, etc on waterquality', 'wqms-iec-activities/slogans-group-meeting-streetplays']
    ],
    'Capacity building activities': [
      ['VWSCs / Pani samithi etc', 'capacity-building-activities/vwscs-pani-samithi-etc'],
      ['Key stakeholders at block level', 'capacity-building-activities/key-stakeholders-block-level'],
      ['Key stakeholders at GP/ Village level', 'capacity-building-activities/key-stakeholders-gp-village-level'],
      ['Capacity building material preparation', 'capacity-building-activities/capacity-building-material-preparation'],
    ],
    // 'Planning Phase': [ 
    'Others': [
      // ['ISA Positioning', 'planningphase/isapositioning'],
      ['Orientation to GP & Staff, Special Board Meeting', 'other-activities/orientationtogp'],
      // ['GP IEC', 'other-activities/gpiec'],
      // ['Community Orientation', 'other-activities/communityorientation'],
      ['GP action plan except DER', 'other-activities/gpactionplanexceptder'],
      // ['GP Board meetting for Gramasabha', 'other-activities/gpboardmeettingforgramasabha'],
      ['Gramasabha action plan approved', 'other-activities/gramasabhaactionplanapproved'],
      ['GPWSC & GP Board meetting', 'other-activities/gpwscgpboardmeetting'],
      ['Beneficiary contribution Collection', 'other-activities/beneficiarycontributioncollection'],
      ['Baseline Data', 'other-activities/baseline-data'],
      ['Details of JJM WSS', 'other-activities/details-jjm-wss'],
    ],
  }

  getSectionSchedule(section: string) {
    if (!this.schedulesFetched) {
      if (this.scheduleApiNotificationshow) {
        this.snackbar.open('Loading Schedules..., Please try again later', 'Dismiss', { duration: 5000, panelClass: 'bg-warning' });
        this.scheduleApiNotificationshow = false;
        setTimeout(() => {
          this.scheduleApiNotificationshow = true;
        }, 10000);
      }
      return -1
    }
    return this.clientSchedules.find(schedule => (
      schedule.section === section &&
      this.selectedDetails.component === schedule.category.component &&
      this.selectedDetails.district === schedule.category.district &&
      this.selectedDetails.gp === schedule.category.gp &&
      this.selectedDetails.phase === schedule.category.phase
    ));
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
          this.snackbar.open(err.error.status || err.statusText, 'Dismiss', { duration: 5000, panelClass: 'bg-danger' });
          reject(err)
        })
    })
  }

  getWardCount(): number {
    if (this.selectedDetails.district && this.selectedDetails.gp) {
      // if (environment.production) {
      //   return 2
      // }
      return this.allDataWithCount[this.selectedDetails.district][this.selectedDetails.gp];
    } else {
      return 1
    }
  }

  getGPs(district: string): string[] {
    return Object.keys(this.allDataWithCount[district]).sort();
  }

  getAllGps() {
    let agps: any = {};
    for (let d in this.allDataWithCount) {
      agps[d] = [];
      for (let gp in this.allDataWithCount[d]) {
        agps[d].push(gp);
      }
    }
    return agps;
  }

  getDistricts(): string[] {
    return Object.keys(this.allDataWithCount).sort()
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
    this.wardConfigData = null;
  }

  printContentByDiv(divId: string, style: string = '') {
    setTimeout(() => {
      let printWindow = window.open('', '_blank', 'toolbar=0,location=0,menubar=0,scrollbars=yes,resizable=1,width=1000,height=600');

      printWindow.document.write('<html><head><title>' + document.title + '</title>');
      printWindow.document.write(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">`);
      printWindow.document.write(`<style>
        ${style}
        @media print{
          .noprint{
              display:none;
          }
        }
        </style>`);
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
    });
  }

}

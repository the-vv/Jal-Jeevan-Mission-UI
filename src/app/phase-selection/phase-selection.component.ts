import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { DataService } from '../services/data.service';
import { RestapiService } from '../services/restapi.service';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phase-selection',
  templateUrl: './phase-selection.component.html',
  styleUrls: ['./phase-selection.component.scss']
})
export class PhaseSelectionComponent implements OnInit, AfterViewInit {

  phases: string[] = []
  phase: string = '';
  menuItems: MenuItem[] = []
  screenObserver: Observable<any> = this.width.observe(['(max-width: 768px)']);
  isSmallScreen: boolean = false;
  isAdmin: boolean = this.user.isAdmin;
  routeUser: string = this.isAdmin ? 'admin' : 'client';

  constructor(
    public data: DataService,
    private width: BreakpointObserver,
    private user: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private rest: RestapiService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.data.selectedDetails.component = null;
    this.user.userChange.subscribe((val) => {
      if (val !== null) {
        // this.data.targetsWarningShown = false;
        this.isAdmin = val?.admin
      }
    })
    if (!this.data.selectedDetails.district || !this.data.selectedDetails.gp) {
      this.router.navigate(['../district'], { relativeTo: this.route })
    }
    this.screenObserver.pipe(map(v => v.matches)).subscribe(val => {
      this.isSmallScreen = val;
    })
    for (const phase in this.data.phaseComponents) {
      if (Object.prototype.hasOwnProperty.call(this.data.phaseComponents, phase)) {
        let menuitem: MenuItem = {
          label: phase,
          items: [],
          icon: 'pi pi-chart-line'
        }
        for (const comp of (this.data.phaseComponents as any)[phase]) {
          menuitem.items?.push({
            label: comp[0],
            icon: 'bi bi-file-earmark-text',
            command: () => {
              let toRoute = this.data.selectComponent(`${phase}~${comp[0]}`);
              // console.log(`${phase}/${comp[0]}`)
              this.router.navigate([`../${toRoute}`], { relativeTo: this.route })
            }
          })
        }
        console.log(menuitem) 
        this.menuItems.push(menuitem)
      }
    }
    if (this.data.wardCongigData === null) {
      this.rest.getWard(this.data.selectedDetails).subscribe(res => {
        if (res === null) {
          this.data.wardCongigData = {
            category: this.data.selectedDetails,
            names: []
          }
        } else {
          this.data.wardCongigData = res;
        }
      }, e => {
        this.snackBar.open('Error fetching Ward Name Configurations, Please Try again later', 'Dismiss', { duration: 5000 })
      })
    }
  }

  gotoGP() {
    this.router.navigate(['../grama-panchayath'], { relativeTo: this.route })
  }

  async ngAfterViewInit() {
    if (!this.data.targetsWarningShown) {
      this.data.targetsWarningShown = true;
      let res = await this.data.getAllSchedules()
      console.log(res);
      if (!this.user.isAdmin) {
        res.forEach(el => {
          this.messageService.add({
            life: 7000, severity: this.isDateExceeded(el.date) ? 'error' : 'success',
            summary: `${this.isDateExceeded(el.date) ? '' : 'Upcoming '}Target${this.isDateExceeded(el.date) ? ' Exceeded' : ''}: ${this.getFormattedDate(+el.date)}`,
            detail: `${el.applicationName}: ${el.section}`
          });
        })
      }
    }
    // this.rest.getAllTargetDate(this.data.selectedDetails).subscribe((res) => {
    //   console.log(res);
    //   res.forEach(el => {
    //     if (el.targetDate) {
    //       this.messageService.add({life: 7000,  severity: 'warn', summary: `${new Date(el.targetDate).toDateString()}`,
    //       detail: `${el.phase}/ ${el.component}` });            
    //     }
    //   });
    // },
    //   e => {
    //     console.log(e);
    //   })  
  }

  isDateExceeded(date: number): boolean {
    let tDate = new Date(Number(date));
    let now = new Date();
    if (tDate.setHours(24, 0, 0, 0) <= now.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  }

  getFormattedDate(date: number) {
    return this.datePipe.transform(new Date(+date), 'mediumDate');
  }

}





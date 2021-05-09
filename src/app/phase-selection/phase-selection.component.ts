import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-phase-selection',
  templateUrl: './phase-selection.component.html',
  styleUrls: ['./phase-selection.component.scss']
})
export class PhaseSelectionComponent implements OnInit {

  phases: string[] = []
  phase: string = '';
  menuItems: MenuItem[] = []
  screenObserver: Observable<any> = this.width.observe(['(max-width: 768px)']);
  isSmallScreen: boolean = false;
  isAdmin: boolean = false;

  constructor(
    public data: DataService,
    private width: BreakpointObserver,
    private user: UserService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.user.userChange.subscribe((val) => {
      if (val !== null) {
        this.isAdmin = val?.admin
      }
    })
    this.screenObserver.pipe(map(v => v.matches)).subscribe(val => {
      this.isSmallScreen = val;
    })
    for (const phase in this.data.phaseComponents) {
      if (Object.prototype.hasOwnProperty.call(this.data.phaseComponents, phase)) {
        let menuitem: MenuItem = {
          label: phase,
          items: []
        }
        for (const comp of (this.data.phaseComponents as any)[phase]) {
          menuitem.items?.push({
            label: comp[0],
            command: () => {
              let toRoute = this.data.selectComponent(`${phase}/${comp[0]}`);
              this.router.navigate([`../${toRoute}`], { relativeTo: this.route })
            }
          })
        }
        this.menuItems.push(menuitem)
      }
    }
  }

}





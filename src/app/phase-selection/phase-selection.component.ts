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
    private router: Router,
    private route: ActivatedRoute,
    public data: DataService,
    private width: BreakpointObserver,
    private user: UserService
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
    this.phases = [
      'Planning Phase',
      'Implementation Phase',
      'Post Implementation Phase'
    ]
    this.menuItems = [
      {
        label: 'Planning Phase',
        items: [
          {
            label: 'ISA Positioning',
          },
          {
            label: 'Orientation to GP & Staff, Special Board Meeting'
          },
          {
            label: 'GP IEC'
          },
          {
            label: 'Community Orientation'
          },
          {
            label: 'GP action plan except DER'
          },
          {
            label: 'GP Board meetting for Gramasabha'
          },
          {
            label: 'Gramasabha action plan approved'
          },
          {
            label: 'GPWSC & GP Board meetting'
          },
          {
            label: 'Beneficiary contribution Collection'
          },
        ]
      },
      {
        label: 'Implementation Phase',
        items: [
          {
            label: 'Some menu',
          },
          { label: 'Onother menu' },
        ]
      },
      {
        label: 'Post Implementation Phase',
        items: [
          {
            label: 'Some menu',
          },
          { label: 'Onother menu' },
        ]
      }
    ]
  }

  onSelect(ph: string) {
    this.phase = ph
  }

  onNext() {
    console.log(this.phase);
    this.data.selectedDetails.phase = this.phase;
    this.router.navigate(['../components'], { relativeTo: this.route })
  }

}





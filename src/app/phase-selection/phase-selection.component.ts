import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-phase-selection',
  templateUrl: './phase-selection.component.html',
  styleUrls: ['./phase-selection.component.scss']
})
export class PhaseSelectionComponent implements OnInit {

  phases: string[] = []
  phase: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.phases = [
      'Planning Phase',
      'Implementation Phase',
      'Post Implementation Phase'
    ]
  }

  onSelect(ph: string) {
    this.phase = ph
  }

  onNext() {
    console.log(this.phase);
    this.data.selectedDetails.phase = this.phase;
    this.router.navigate(['../components'], {relativeTo: this.route})
  }

}




  
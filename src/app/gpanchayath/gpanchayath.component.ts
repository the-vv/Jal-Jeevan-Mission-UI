import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-gpanchayath',
  templateUrl: './gpanchayath.component.html',
  styleUrls: ['./gpanchayath.component.scss']
})
export class GpanchayathComponent implements OnInit {

  public gramaPanchataths: string[] = []
  public gPanchayath: string = ''

  constructor(
    public data: DataService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('gp page');
    this.gramaPanchataths = this.data.getGPs(this.data.selectedDetails.district)
    console.log(this.gramaPanchataths)
  }

  onSelect() {
    this.data.selectedDetails.gp = this.gPanchayath;
    this.router.navigate(['../phase'], { relativeTo: this.route })
  }

}

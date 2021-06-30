import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  @Input('admin')
  public isAdmin: boolean = false;

  @Input('name')
  public name: string;

  public user: string = this.isAdmin ? 'Admin' : 'Client';

  constructor(public data: DataService,
    public router: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  gotoGP() {
    this.router.navigate([`../grama-panchayath`], { relativeTo: this.route })
  }

  gotoPhase() {
    this.router.navigate([`../phase`], { relativeTo: this.route })
  }

}

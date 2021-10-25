import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-breadcrump',
  templateUrl: './breadcrump.component.html',
  styleUrls: ['./breadcrump.component.scss']
})
export class BreadcrumpComponent implements OnInit {

  @Input('admin')
  public isAdmin: boolean = false;

  @Input('name')
  public name: string;

  public user: string = this.isAdmin ? 'admin' : 'client';

  constructor(public data: DataService,
    public router: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  gotoGP() {
    this.router.navigate([`../../grama-panchayath`], { relativeTo: this.route })
  }

  gotoPhase() {
    this.router.navigate([`../../phase`], { relativeTo: this.route })
  }

}

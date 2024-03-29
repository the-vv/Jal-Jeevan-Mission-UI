import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  public DistrictsList: string[] = []
  public district: string = '';

  constructor(
    private data: DataService,
    public user: UserService
  ) { }

  ngOnInit(): void {
    this.DistrictsList = this.data.getDistricts()
    this.data.clearUserData();
  }

  onSelect() {
    console.log(this.district)
    this.data.selectedDetails.district = this.district;
    // this.router.navigate(['../grama-panchayath'], { relativeTo: this.route })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

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

  public user: string = this.userService.isAdmin ? 'Admin' : 'Client';

  constructor(
    public data: DataService,
    public userService: UserService
    ) { }

  ngOnInit(): void {
  }

}

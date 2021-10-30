import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

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

  public user: string = this.userService.isAdmin ? 'Admin' : 'Client';

  constructor(
    public data: DataService,
    public userService: UserService
    ) { }

  ngOnInit(): void {
  }

}

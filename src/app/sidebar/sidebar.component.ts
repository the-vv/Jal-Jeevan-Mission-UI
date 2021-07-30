import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TargetDate } from '../models/application';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public data: DataService,
    public user: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getDate(dateString: number) {
    return new Date(+dateString);
  }

  gotoForm(path: string, phase: string, comp: string) {
    console.log([this.user.isAdmin ? 'admin' : 'client', path])
    this.data.selectComponent(`${phase}/${comp}`);
    this.router.navigate([this.user.isAdmin ? 'admin/' + path : 'client/' + path])
    .then(res => {
      if(res) {
        this.data.isSidebarOpened = false;
      }
    })
  }

  isDateExceeded(date: number): boolean {
    let tDate = new Date(Number(date));
    let now = new Date();
    if (tDate.setHours(24, 0, 0, 0) <= now.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';
import { TargetDate } from '../models/application';
import { DataService } from '../services/data.service';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-schedule-menu',
  templateUrl: './schedule-menu.component.html',
  styleUrls: ['./schedule-menu.component.scss']
})
export class ScheduleMenuComponent implements OnInit {

  @Input('section')
  public sectionName: string;

  @Input('iconOnly')
  public iconOnly: boolean;

  target: TargetDate = null;

  constructor(
    private dialog: MatDialog,
    private data: DataService,
    private rest: RestapiService
  ) { }

  async ngOnInit() {
    this.target = await this.data.getSectionSchedule(this.sectionName);
    console.log(this.target)
  }

  openDateDialogue() {
    this.dialog.open(DateDialogComponent, {
      data: {
        section: this.sectionName
      }
    }).afterClosed().subscribe(async (e) => {
      this.target = await this.data.getSectionSchedule(this.sectionName);
    });
  }

  getDate() {
    return new Date(Number(this.target.date));
  }

  isDateExceeded(): boolean {
    let tDate = new Date(Number(this.target.date));
    let now = new Date();
    if (tDate.setHours(24, 0, 0, 0) <= now.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  }

}

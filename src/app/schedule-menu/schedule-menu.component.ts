import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';

@Component({
  selector: 'app-schedule-menu',
  templateUrl: './schedule-menu.component.html',
  styleUrls: ['./schedule-menu.component.scss']
})
export class ScheduleMenuComponent implements OnInit {

  @Input('section')
  public sectionName: string;

  constructor(
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  openDateDialogue(section: string) {
    this.dialog.open(DateDialogComponent, {
      data: {
        section
      }
    });
  }

}

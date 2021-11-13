import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventInput } from '@fullcalendar/common';
import { CalendarOptions } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import { DataService } from 'src/app/services/data.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UserService } from 'src/app/services/user.service';
import { EventPopupComponent } from './event-popup/event-popup.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  schedulerEvents: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    themeSystem:'standard',
    initialView: 'dayGridMonth',
    headerToolbar: {
      center: 'title',
      left: 'prev,next,today',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    events: this.schedulerEvents,
    dateClick: this.showEvent.bind(this),
    eventClick: (data) => {
      this.viewEvent(data);
    },
    editable: true,
    selectable: true,
    eventStartEditable: false
  };

  constructor(
    public data: DataService,
    private user: UserService,
    private router: Router,
    private rest: RestapiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.user.isAdmin) {
      this.rest.getAllSchedules().subscribe(res => {
        res.forEach(el => {
          this.schedulerEvents.push(
            {
              title: `${el.section} (${el.category.component})`,
              date: new Date(Number(el.date)),
              allDay: true,
              backgroundColor: this.isDateExceeded(el.date) ? 'red' : 'green',
              extendedProps: { category: el.category, path: el.path, expired: this.isDateExceeded(el.date) }
            }
          )
        })
        this.calendarOptions = { ...this.calendarOptions, events: this.schedulerEvents }
        // console.log(this.calendarOptions)
      })
    } else {
      // console.log(this.data.clientSchedules)
      this.data.clientSchedules.forEach(el => {
        this.schedulerEvents.push(
          {
            title: `${el.section} (${el.category.component})`,
            date: new Date(Number(el.date)),
            allDay: true,
            backgroundColor: this.isDateExceeded(el.date) ? 'red' : 'green',
            extendedProps: { category: el.category, path: el.path, expired: this.isDateExceeded(el.date) }
          }
        )
      })
      this.calendarOptions = { ...this.calendarOptions, events: this.schedulerEvents }
      // console.log(this.calendarOptions)
    }
  }

  showEvent(event: DateClickArg) {
    console.log(event);
  }
  gotoForm(path: string, phase: string, comp: string) {
    console.log([this.user.isAdmin ? 'admin' : 'client', path])
    this.data.selectComponent(`${phase}/${comp}`);
    this.router.navigate([this.user.isAdmin ? 'admin/' + path : 'client/' + path])
  }

  isDateExceeded(date: number): boolean {
    let tDate = new Date(Number(date));
    let now = new Date();
    if (tDate.setHours(24, 0, 0, 0) <= now.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  }

  viewEvent(data: any) {
    const dialogRef = this.dialog.open(EventPopupComponent, {
      data: data?.event?._def
    });
  }

}

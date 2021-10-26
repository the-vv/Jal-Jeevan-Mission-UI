import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventInput } from '@fullcalendar/common';
import { CalendarOptions } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import { DataService } from 'src/app/services/data.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  schedulerEvents: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      center: 'title',
      right: 'prev,next,today',
      left: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: this.schedulerEvents,
    dateClick: this.showEvent.bind(this),
    eventClick: (data) => {
      console.log(data.event)
    },
    editable: true,
    selectable: true,
    eventStartEditable: false
  };

  constructor(
    public data: DataService,
    private user: UserService,
    private router: Router,
    private rest: RestapiService
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
              constraint: { category: el.category, path: el.path }
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
            constraint: { category: el.category, path: el.path }
          }
        )
      })
      this.calendarOptions = { ...this.calendarOptions, events: this.schedulerEvents }
      // console.log(this.calendarOptions)
    }
  }

  showEvent(event: DateClickArg) {
    console.log(event.date);
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

}

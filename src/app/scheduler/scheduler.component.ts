import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { DateClickArg } from '@fullcalendar/interaction';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'title',
      right: 'prev,next,today',
      center: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      { title: 'event 1', start: new Date(), end: new Date() },
      { title: 'event 2', date: new Date() }
    ],
    dateClick: this.showEvent.bind(this),
    eventClick: (data) => {
      console.log(data.event)
    },
    editable: true,
    selectable:true,
    selectMirror: true,
    dayMaxEvents: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

  showEvent(event: DateClickArg) {
    console.log(event.date);
  }

}

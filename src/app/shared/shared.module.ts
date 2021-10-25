import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { ReportComponent } from './report/report.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BreadcrumpComponent } from './breadcrump/breadcrump.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { DateDialogComponent } from './date-dialog/date-dialog.component';
import { ScheduleMenuComponent } from './schedule-menu/schedule-menu.component';


@NgModule({
  declarations: [
    SharedComponent,
    ReportComponent,
    CalendarComponent,
    BreadcrumpComponent,
    ContactDetailsComponent,
    DateDialogComponent,
    ScheduleMenuComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


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
    SharedRoutingModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    SharedComponent,
    ReportComponent,
    CalendarComponent,
    BreadcrumpComponent,
    ContactDetailsComponent,
    DateDialogComponent,
    ScheduleMenuComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { ReportComponent } from './report/report.component';
import { BreadcrumpComponent } from './breadcrump/breadcrump.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { DateDialogComponent } from './date-dialog/date-dialog.component';
import { ScheduleMenuComponent } from './schedule-menu/schedule-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    SharedComponent,
    ReportComponent,
    BreadcrumpComponent,
    ContactDetailsComponent,
    DateDialogComponent,
    ScheduleMenuComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatSnackBarModule,
    MatIconModule,  
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    NgxSpinnerModule,
    MatOptionModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [
    SharedComponent,
    ReportComponent,
    BreadcrumpComponent,
    ContactDetailsComponent,
    DateDialogComponent,
    ScheduleMenuComponent,
    CommonModule,
    FormsModule
  ],
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
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
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { CropperComponent } from './cropper/cropper.component';
import { AdminVerifyComponent } from './admin-verify/admin-verify.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    SharedComponent,
    BreadcrumpComponent,
    ContactDetailsComponent,
    DateDialogComponent,
    ScheduleMenuComponent,
    FileUploaderComponent,
    CropperComponent,
    AdminVerifyComponent
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
    MatDialogModule,
    FileUploadModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDialogModule,
  ],
  exports: [
    SharedComponent,
    BreadcrumpComponent,
    ContactDetailsComponent,
    DateDialogComponent,
    ScheduleMenuComponent,
    CommonModule,
    FormsModule,
    FileUploaderComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: environment.DATE_FORMATS },
  ]
})
export class SharedModule { }

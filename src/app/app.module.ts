import { BrowserModule, } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { NgxSpinnerModule } from "ngx-spinner";

// Angular Material Imports 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {
  DateAdapter, MatNativeDateModule, MatRippleModule,
  MAT_DATE_FORMATS, MAT_DATE_LOCALE
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

// PrimeNg Imports
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './services/data.service';
import { DistrictComponent } from './district/district.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GpanchayathComponent } from './gpanchayath/gpanchayath.component';
import { PhaseSelectionComponent } from './phase-selection/phase-selection.component';
import { PhaseComponentsComponent } from './phase-components/phase-components.component';
import { LoginComponent } from './login/login.component';
import { RestapiService } from './services/restapi.service';
import { UserService } from './services/user.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { IsaPositioningComponent } from './planningPhase/isa-positioning/isa-positioning.component';
import { OrientationToGpComponent } from './planningPhase/orientation-to-gp/orientation-to-gp.component';
import { GpIecActivitiesComponent } from './planningPhase/gp-iec-activities/gp-iec-activities.component';
import { CommunityOrientationComponent } from './planningPhase/community-orientation/community-orientation.component';
import { GpActionPlanComponent } from './planningPhase/gp-action-plan/gp-action-plan.component';
import { GpBoardMeetingComponent } from './planningPhase/gp-board-meeting/gp-board-meeting.component';
import { GpActionApprovedComponent } from './planningPhase/gp-action-approved/gp-action-approved.component';
import { GpwcBoardMeetingComponent } from './planningPhase/gpwc-board-meeting/gpwc-board-meeting.component';
import { BeneficiaryContributionComponent } from './planningPhase/beneficiary-contribution/beneficiary-contribution.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { SpinnerService } from './services/spinner.service';
import { AdministrationComponent } from './administration/administration.component';
import { MessageService } from 'primeng/api';
import { ReportHomeComponent } from './report-home/report-home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DateDialogComponent } from './date-dialog/date-dialog.component';
import { ScheduleMenuComponent } from './schedule-menu/schedule-menu.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DistrictComponent,
    GpanchayathComponent,
    PhaseSelectionComponent,
    PhaseComponentsComponent,
    LoginComponent,
    NotfoundComponent,
    IsaPositioningComponent,
    OrientationToGpComponent,
    GpIecActivitiesComponent,
    CommunityOrientationComponent,
    GpActionPlanComponent,
    GpBoardMeetingComponent,
    GpActionApprovedComponent,
    GpwcBoardMeetingComponent,
    BeneficiaryContributionComponent,
    BreadCrumbComponent,
    AdministrationComponent,
    ReportHomeComponent,
    SidebarComponent,
    DateDialogComponent,
    ScheduleMenuComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MenuModule,
    TieredMenuModule,
    LayoutModule,
    PanelMenuModule,
    BreadcrumbModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FileUploadModule,
    InputTextareaModule,
    MatProgressBarModule,
    MatExpansionModule,
    ButtonModule,
    NgxSpinnerModule,
    MatTabsModule,
    MatCardModule,
    ToastModule,
    MatSidenavModule,
    MatDialogModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule
  ],
  providers: [
    DataService,
    RestapiService,
    UserService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerService, multi: true },
    MessageService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

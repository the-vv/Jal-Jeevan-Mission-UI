import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Imports 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';


// PrimeNg Imports
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';


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
    GpBoardMeetingComponent
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
    ButtonModule
  ],
  providers: [
    DataService,
    RestapiService,
    UserService
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IecActivitiesRoutingModule } from './iec-activities-routing.module';
import { IecActivitiesComponent } from './iec-activities.component';
import { WallPaintingsComponent } from './wall-paintings/wall-paintings.component';
import { HoardingsBannersComponent } from './hoardings-banners/hoardings-banners.component';
import { TvSportsComponent } from './tv-sports/tv-sports.component';
import { FlipbookChartsComponent } from './flipbook-charts/flipbook-charts.component';
import { PostersTouristLocationsComponent } from './posters-tourist-locations/posters-tourist-locations.component';
import { SchoolsComponent } from './schools/schools.component';
import { AnganawadiComponent } from './anganawadi/anganawadi.component';
import { GpBuldingsComponent } from './gp-buldings/gp-buldings.component';
import { LaborotariesComponent } from './laborotaries/laborotaries.component';
import { PheOfficesComponent } from './phe-offices/phe-offices.component';
import { AnnouncementVansComponent } from './announcement-vans/announcement-vans.component';
import { OtherActivitiesComponent } from './other-activities/other-activities.component';
import { WaterResourceMappingComponent } from './water-resource-mapping/water-resource-mapping.component';
import { WaterAuditBudgetComponent } from './water-audit-budget/water-audit-budget.component';
import { NukkadNatakDramaStreetplayComponent } from './nukkad-natak-drama-streetplay/nukkad-natak-drama-streetplay.component';
import { FolksongsKalajathaComponent } from './folksongs-kalajatha/folksongs-kalajatha.component';
import { RalliesComponent } from './rallies/rallies.component';
import { GramasabhasDevelopmentSeminarComponent } from './gramasabhas-development-seminar/gramasabhas-development-seminar.component';
import { VapPreperationApprovalComponent } from './vap-preperation-approval/vap-preperation-approval.component';
import { PraActivitiesComponent } from './pra-activities/pra-activities.component';
import { SchoolCompetitionsComponent } from './school-competitions/school-competitions.component';
import { ShgInvolvementComponent } from './shg-involvement/shg-involvement.component';
import { WaterSafetyPlanningComponent } from './water-safety-planning/water-safety-planning.component';
import { OthersComponent } from './others/others.component';
import { WorldWaterDayComponent } from './world-water-day/world-water-day.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { ConferenceInnovationEventsComponent } from './conference-innovation-events/conference-innovation-events.component';
import { IpcActivitiesComponent } from './ipc-activities/ipc-activities.component';
import { IecMaterialPreperationComponent } from './iec-material-preperation/iec-material-preperation.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    IecActivitiesComponent,
    WallPaintingsComponent,
    HoardingsBannersComponent,
    TvSportsComponent,
    FlipbookChartsComponent,
    PostersTouristLocationsComponent,
    SchoolsComponent,
    AnganawadiComponent,
    GpBuldingsComponent,
    LaborotariesComponent,
    PheOfficesComponent,
    AnnouncementVansComponent,
    OtherActivitiesComponent,
    WaterResourceMappingComponent,
    WaterAuditBudgetComponent,
    NukkadNatakDramaStreetplayComponent,
    FolksongsKalajathaComponent,
    RalliesComponent,
    GramasabhasDevelopmentSeminarComponent,
    VapPreperationApprovalComponent,
    PraActivitiesComponent,
    SchoolCompetitionsComponent,
    ShgInvolvementComponent,
    WaterSafetyPlanningComponent,
    OthersComponent,
    WorldWaterDayComponent,
    ExhibitionsComponent,
    ConferenceInnovationEventsComponent,
    IpcActivitiesComponent,
    IecMaterialPreperationComponent
  ],
  imports: [
    CommonModule,
    IecActivitiesRoutingModule,
    SharedModule, 
    MatIconModule,  
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatSnackBarModule,
  ]
})
export class IecActivitiesModule { }

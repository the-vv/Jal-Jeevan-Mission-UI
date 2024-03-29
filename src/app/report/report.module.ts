import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IecActivitiesModule } from '../iec-activities/iec-activities.module';
import { EngagementIsaModule } from '../engagement-isa/engagement-isa.module';
import { DocumentationActivityModule } from '../documentation-activity/documentation-activity.module';
import { SocialAuditsModule } from '../social-audits/social-audits.module';
import { WqmsTrainingModule } from '../wqms-training/wqms-training.module';
import { OtherActivitiesModule } from '../other-activities/other-activities.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';
import { CapacityBuildingActivitiesModule } from '../capacity-building-activities/capacity-building-activities.module';


@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    IecActivitiesModule,
    EngagementIsaModule,
    DocumentationActivityModule,
    SocialAuditsModule,
    WqmsTrainingModule,
    OtherActivitiesModule,
    CapacityBuildingActivitiesModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: environment.DATE_FORMATS },
  ]
})
export class ReportModule { }

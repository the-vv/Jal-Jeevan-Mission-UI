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
    WqmsTrainingModule
  ]
})
export class ReportModule { }

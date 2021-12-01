import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherActivitiesRoutingModule } from './other-activities-routing.module';
import { OtherActivitiesComponent } from './other-activities.component';

import { IsaPositioningComponent } from './isa-positioning/isa-positioning.component';
import { OrientationToGpComponent } from './orientation-to-gp/orientation-to-gp.component';
import { GpIecActivitiesComponent } from './gp-iec-activities/gp-iec-activities.component';
import { CommunityOrientationComponent } from './community-orientation/community-orientation.component';
import { GpActionPlanComponent } from './gp-action-plan/gp-action-plan.component';
import { GpBoardMeetingComponent } from './gp-board-meeting/gp-board-meeting.component';
import { GpActionApprovedComponent } from './gp-action-approved/gp-action-approved.component';
import { GpwcBoardMeetingComponent } from './gpwc-board-meeting/gpwc-board-meeting.component';
import { BeneficiaryContributionComponent } from './beneficiary-contribution/beneficiary-contribution.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModulesModule } from '../common.module';
import { FileUploadModule } from 'primeng/fileupload';
import { BaselineDataComponent } from './baseline-data/baseline-data.component';
import { ConfirmationService } from 'primeng/api';
import { DetailsJjmWssComponent } from './details-jjm-wss/details-jjm-wss.component';


@NgModule({
  declarations: [
    OtherActivitiesComponent,
    IsaPositioningComponent,
    OrientationToGpComponent,
    GpIecActivitiesComponent,
    CommunityOrientationComponent,
    GpActionPlanComponent,
    GpBoardMeetingComponent,
    GpActionApprovedComponent,
    GpwcBoardMeetingComponent,
    BeneficiaryContributionComponent,
    BaselineDataComponent,
    DetailsJjmWssComponent,
  ],
  imports: [
    CommonModule,
    OtherActivitiesRoutingModule,
    SharedModule,
    CommonModulesModule,
    FileUploadModule
  ],
  providers: [
    ConfirmationService
  ],
  exports: [
    OtherActivitiesComponent,
    // IsaPositioningComponent,
    OrientationToGpComponent,
    GpIecActivitiesComponent,
    CommunityOrientationComponent,
    GpActionPlanComponent,
    GpBoardMeetingComponent,
    GpActionApprovedComponent,
    GpwcBoardMeetingComponent,
    BeneficiaryContributionComponent,
    BaselineDataComponent,
    DetailsJjmWssComponent,
  ]
})
export class OtherActivitiesModule { }

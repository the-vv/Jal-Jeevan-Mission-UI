import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaselineDataComponent } from './baseline-data/baseline-data.component';
import { BeneficiaryContributionComponent } from './beneficiary-contribution/beneficiary-contribution.component';
import { CommunityOrientationComponent } from './community-orientation/community-orientation.component';
import { GpActionApprovedComponent } from './gp-action-approved/gp-action-approved.component';
import { GpBoardMeetingComponent } from './gp-board-meeting/gp-board-meeting.component';
import { GpIecActivitiesComponent } from './gp-iec-activities/gp-iec-activities.component';
import { GpwcBoardMeetingComponent } from './gpwc-board-meeting/gpwc-board-meeting.component';
import { IsaPositioningComponent } from './isa-positioning/isa-positioning.component';
import { OrientationToGpComponent } from './orientation-to-gp/orientation-to-gp.component';
import { OtherActivitiesComponent } from './other-activities.component';

const routes: Routes = [
  { path: '', component: OtherActivitiesComponent },
  { path: 'isapositioning', component: IsaPositioningComponent },
  { path: 'orientationtogp', component: OrientationToGpComponent },
  { path: 'gpiec', component: GpIecActivitiesComponent },
  { path: 'communityorientation', component: CommunityOrientationComponent },
  { path: 'gpactionplanexceptder', component: GpActionApprovedComponent },
  { path: 'gpboardmeettingforgramasabha', component: GpBoardMeetingComponent },
  { path: 'gramasabhaactionplanapproved', component: GpActionApprovedComponent },
  { path: 'gpwscgpboardmeetting', component: GpwcBoardMeetingComponent },
  { path: 'beneficiarycontributioncollection', component: BeneficiaryContributionComponent },
  { path: 'baseline-data', component: BaselineDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherActivitiesRoutingModule { }

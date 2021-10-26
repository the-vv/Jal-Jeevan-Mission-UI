import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictComponent } from './district/district.component';
import { GpanchayathComponent } from './gpanchayath/gpanchayath.component';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { HomeComponent } from './home/home.component';
import { IsaPositioningComponent } from './planningPhase/isa-positioning/isa-positioning.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PhaseComponentsComponent } from './phase-components/phase-components.component';
import { PhaseSelectionComponent } from './phase-selection/phase-selection.component';
import { OrientationToGpComponent } from './planningPhase/orientation-to-gp/orientation-to-gp.component';
import { GpIecActivitiesComponent } from './planningPhase/gp-iec-activities/gp-iec-activities.component';
import { CommunityOrientationComponent } from './planningPhase/community-orientation/community-orientation.component';
import { GpActionPlanComponent } from './planningPhase/gp-action-plan/gp-action-plan.component';
import { GpBoardMeetingComponent } from './planningPhase/gp-board-meeting/gp-board-meeting.component';
import { GpActionApprovedComponent } from './planningPhase/gp-action-approved/gp-action-approved.component';
import { GpwcBoardMeetingComponent } from './planningPhase/gpwc-board-meeting/gpwc-board-meeting.component';
import { BeneficiaryContributionComponent } from './planningPhase/beneficiary-contribution/beneficiary-contribution.component';
import { AdministrationComponent } from './administration/administration.component';
import { ReportHomeComponent } from './report-home/report-home.component';


let commonRoutes: Routes = [
  { path: 'phase', component: PhaseSelectionComponent },
  { path: 'planningphase/components', component: PhaseComponentsComponent },
  { path: 'planningphase/isapositioning', component: IsaPositioningComponent },
  { path: 'planningphase/orientationtogp', component: OrientationToGpComponent },
  { path: 'planningphase/gpiec', component: GpIecActivitiesComponent },
  { path: 'planningphase/communityorientation', component: CommunityOrientationComponent },
  { path: 'planningphase/gpactionplanexceptder', component: GpActionPlanComponent },
  { path: 'planningphase/gpboardmeettingforgramasabha', component: GpBoardMeetingComponent },
  { path: 'planningphase/gramasabhaactionplanapproved', component: GpActionApprovedComponent },
  { path: 'planningphase/gpwscgpboardmeetting', component: GpwcBoardMeetingComponent },
  { path: 'planningphase/beneficiarycontributioncollection', component: BeneficiaryContributionComponent },
  { path: 'iec-activities', loadChildren: () => import('./iec-activities/iec-activities.module').then(m => m.IecActivitiesModule) },
  { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },
];

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin', component: HomeComponent, canActivate: [AdminGuard], children: [
      { path: '', redirectTo: 'district', pathMatch: 'full' },
      { path: 'reports', component: ReportHomeComponent },
      { path: 'administration', component: AdministrationComponent },
      { path: 'district', component: DistrictComponent },
      { path: 'grama-panchayath', component: GpanchayathComponent },
      ...commonRoutes,
      { path: '**', redirectTo: 'district', pathMatch: 'full' },
    ]
  },
  {
    path: 'client', component: HomeComponent, canActivate: [ClientGuard], children: [
      { path: '', redirectTo: 'phase', pathMatch: 'full' },
      { path: 'reports', component: ReportHomeComponent },
      ...commonRoutes,
      { path: '**', redirectTo: 'phase', pathMatch: 'full' },
    ]
  },
  { path: 'capacityBuilding', loadChildren: () => import('./capacity-building-activities/capacity-building-activities.module').then(m => m.CapacityBuildingActivitiesModule) },
  { path: 'documentationAactivity', loadChildren: () => import('./documentation-activity/documentation-activity.module').then(m => m.DocumentationActivityModule) },
  { path: 'socialAudits', loadChildren: () => import('./social-audits/social-audits.module').then(m => m.SocialAuditsModule) },
  { path: 'wqmsIec', loadChildren: () => import('./wqm-iec/wqm-iec.module').then(m => m.WqmIecModule) },
  { path: 'wqmsTrainging', loadChildren: () => import('./wqms-training/wqms-training.module').then(m => m.WqmsTrainingModule) },
  { path: 'engagementIsa', loadChildren: () => import('./engagement-isa/engagement-isa.module').then(m => m.EngagementIsaModule) },
  {
    path: '**', redirectTo: '404', pathMatch: 'full'
  },
  {
    path: '404', component: NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

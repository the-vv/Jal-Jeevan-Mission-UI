import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictComponent } from './district/district.component';
import { GpanchayathComponent } from './gpanchayath/gpanchayath.component';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { HomeComponent } from './home/home.component';
// import { IsaPositioningComponent } from './planningPhase/isa-positioning/isa-positioning.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PhaseSelectionComponent } from './phase-selection/phase-selection.component';
import { AdminAuthorizeGuard } from './guards/admin-authorize.guard';
import { ResolverService } from './services/resolver.service';


const commonRoutes: Routes = [
  { path: 'phase', component: PhaseSelectionComponent },
  { path: 'iec-activities', loadChildren: () => import('./iec-activities/iec-activities.module').then(m => m.IecActivitiesModule) },
  { path: 'engagement-isa', loadChildren: () => import('./engagement-isa/engagement-isa.module').then(m => m.EngagementIsaModule) },
  { path: 'other-activities', loadChildren: () => import('./other-activities/other-activities.module').then(m => m.OtherActivitiesModule) },
  { path: 'wqms-trainging', loadChildren: () => import('./wqms-training/wqms-training.module').then(m => m.WqmsTrainingModule) },
  { path: 'documentation', loadChildren: () => import('./documentation-activity/documentation-activity.module').then(m => m.DocumentationActivityModule) },
  { path: 'social-audits', loadChildren: () => import('./social-audits/social-audits.module').then(m => m.SocialAuditsModule) },
  { path: 'capacity-building-activities', loadChildren: () => import('./capacity-building-activities/capacity-building-activities.module').then(m => m.CapacityBuildingActivitiesModule) },
  { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },
  { path: 'reports', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
];

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, resolve: { gpData: ResolverService }
  },
  {
    path: 'admin', component: HomeComponent, canActivate: [AdminGuard], children: [
      { path: '', redirectTo: 'district', pathMatch: 'full' },
      { path: 'administration', canActivate: [AdminAuthorizeGuard], canLoad: [AdminAuthorizeGuard], loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
      { path: 'district', component: DistrictComponent },
      { path: 'grama-panchayath', component: GpanchayathComponent },
      { path: 'claim-details', loadChildren: () => import('./claim-details/claim-details.module').then(m => m.ClaimDetailsModule) },
      ...commonRoutes,
      { path: '**', redirectTo: 'district', pathMatch: 'full' },
    ]
  },
  {
    path: 'client', component: HomeComponent, canActivate: [ClientGuard], children: [
      { path: '', redirectTo: 'phase', pathMatch: 'full' },
      ...commonRoutes,
      { path: '**', redirectTo: 'phase', pathMatch: 'full' },
    ]
  },
  {
    path: '**', redirectTo: '404', pathMatch: 'full'
  },
  {
    path: '404', component: NotfoundComponent, resolve: { gpData: ResolverService }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

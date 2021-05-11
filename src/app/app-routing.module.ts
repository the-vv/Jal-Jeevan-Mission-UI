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
      { path: 'district', component: DistrictComponent },
      { path: 'grama-panchayath', component: GpanchayathComponent },
      { path: 'phase', component: PhaseSelectionComponent },
      { path: 'components', component: PhaseComponentsComponent },
      { path: 'isapositioning', component: IsaPositioningComponent },
      { path: 'orientationtogp', component: OrientationToGpComponent },
      { path: 'gpiec', component: GpIecActivitiesComponent },
      { path: '**', redirectTo: 'district', pathMatch: 'full' },
    ]
  },
  {
    path: 'client', component: HomeComponent, canActivate: [ClientGuard], children: [
      { path: '', redirectTo: 'phase', pathMatch: 'full' },
      { path: 'phase', component: PhaseSelectionComponent },
      { path: 'components', component: PhaseComponentsComponent },
      { path: 'isapositioning', component: IsaPositioningComponent },
      { path: 'orientationtogp', component: OrientationToGpComponent },
      { path: 'gpiec', component: GpIecActivitiesComponent },
      { path: '**', redirectTo: 'phase', pathMatch: 'full' },
    ]
  },
  {
    path: '**', redirectTo: '404', pathMatch: 'full'
  },
  {
    path: '404', component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

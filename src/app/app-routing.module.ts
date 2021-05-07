import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictComponent } from './district/district.component';
import { GpanchayathComponent } from './gpanchayath/gpanchayath.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PhaseComponentsComponent } from './phase-components/phase-components.component';
import { PhaseSelectionComponent } from './phase-selection/phase-selection.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'district',
        pathMatch: 'full'
      },
      {
        path: 'district',
        component: DistrictComponent
      },
      {
        path: 'grama-panchayath',
        component: GpanchayathComponent
      },
      {
        path: 'phase',
        component: PhaseSelectionComponent
      },
      {
        path: 'components',
        component: PhaseComponentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

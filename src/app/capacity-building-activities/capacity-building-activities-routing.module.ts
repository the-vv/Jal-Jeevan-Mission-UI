import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapacityBuildingActivitiesComponent } from './capacity-building-activities.component';

const routes: Routes = [{ path: '', component: CapacityBuildingActivitiesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacityBuildingActivitiesRoutingModule { }

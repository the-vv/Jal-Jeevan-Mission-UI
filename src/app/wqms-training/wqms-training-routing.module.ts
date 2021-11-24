import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpSubCommitiesComponent } from './gp-sub-commities/gp-sub-commities.component';
import { WqmsIsasPriComponent } from './wqms-isas-pri/wqms-isas-pri.component';
import { WqmsTrainingComponent } from './wqms-training.component';

const routes: Routes = [
  { path: '', component: WqmsTrainingComponent },
  { path: 'gp-sub-commities', component: GpSubCommitiesComponent },
  { path: 'wqms-isa-pri', component: WqmsIsasPriComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WqmsTrainingRoutingModule { }

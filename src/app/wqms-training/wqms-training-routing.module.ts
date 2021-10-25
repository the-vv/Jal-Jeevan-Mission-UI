import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WqmsTrainingComponent } from './wqms-training.component';

const routes: Routes = [{ path: '', component: WqmsTrainingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WqmsTrainingRoutingModule { }

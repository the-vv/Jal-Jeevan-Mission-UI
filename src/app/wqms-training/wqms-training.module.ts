import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WqmsTrainingRoutingModule } from './wqms-training-routing.module';
import { WqmsTrainingComponent } from './wqms-training.component';
import { GpSubCommitiesComponent } from './gp-sub-commities/gp-sub-commities.component';
import { WqmsIsasPriComponent } from './wqms-isas-pri/wqms-isas-pri.component';


@NgModule({
  declarations: [
    WqmsTrainingComponent,
    GpSubCommitiesComponent,
    WqmsIsasPriComponent
  ],
  imports: [
    CommonModule,
    WqmsTrainingRoutingModule
  ]
})
export class WqmsTrainingModule { }

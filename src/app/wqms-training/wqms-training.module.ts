import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WqmsTrainingRoutingModule } from './wqms-training-routing.module';
import { WqmsTrainingComponent } from './wqms-training.component';
import { GpSubCommitiesComponent } from './gp-sub-commities/gp-sub-commities.component';
import { WqmsIsasPriComponent } from './wqms-isas-pri/wqms-isas-pri.component';
import { CommonModulesModule } from '../common.module';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationService } from 'primeng/api';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    WqmsTrainingComponent,
    GpSubCommitiesComponent,
    WqmsIsasPriComponent
  ],
  imports: [
    CommonModule,
    WqmsTrainingRoutingModule,
    CommonModulesModule,
    SharedModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: environment.DATE_FORMATS },
    ConfirmationService
  ],
  exports: [
    WqmsTrainingComponent,
    GpSubCommitiesComponent,
    WqmsIsasPriComponent
  ]
})
export class WqmsTrainingModule { }

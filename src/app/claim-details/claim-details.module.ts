import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimDetailsRoutingModule } from './claim-details-routing.module';
import { ClaimDetailsComponent } from './claim-details.component';
import { CommonModulesModule } from '../common.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClaimDetailsComponent
  ],
  imports: [
    CommonModule,
    ClaimDetailsRoutingModule,
    CommonModulesModule,
    SharedModule
  ]
})
export class ClaimDetailsModule { }

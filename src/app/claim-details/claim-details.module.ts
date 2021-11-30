import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimDetailsRoutingModule } from './claim-details-routing.module';
import { ClaimDetailsComponent } from './claim-details.component';
import { CommonModulesModule } from '../common.module';
import { SharedModule } from '../shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    ClaimDetailsComponent
  ],
  imports: [
    CommonModule,
    ClaimDetailsRoutingModule,
    CommonModulesModule,
    SharedModule,
    MatSlideToggleModule
  ]
})
export class ClaimDetailsModule { }

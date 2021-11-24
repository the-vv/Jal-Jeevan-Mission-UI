import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialAuditsRoutingModule } from './social-audits-routing.module';
import { SocialAuditsComponent } from './social-audits.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModulesModule } from '../common.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    SocialAuditsComponent
  ],
  imports: [
    CommonModule,
    SocialAuditsRoutingModule,
    SharedModule,
    CommonModulesModule
  ],
  providers: [
    ConfirmationService
  ],
  exports: [
    SocialAuditsComponent
  ]
})
export class SocialAuditsModule { }

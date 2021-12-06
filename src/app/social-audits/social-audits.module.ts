import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialAuditsRoutingModule } from './social-audits-routing.module';
import { SocialAuditsComponent } from './social-audits.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModulesModule } from '../common.module';
import { ConfirmationService } from 'primeng/api';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';


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
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: environment.DATE_FORMATS },
    ConfirmationService
  ],
  exports: [
    SocialAuditsComponent
  ]
})
export class SocialAuditsModule { }

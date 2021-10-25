import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialAuditsRoutingModule } from './social-audits-routing.module';
import { SocialAuditsComponent } from './social-audits.component';


@NgModule({
  declarations: [
    SocialAuditsComponent
  ],
  imports: [
    CommonModule,
    SocialAuditsRoutingModule
  ]
})
export class SocialAuditsModule { }

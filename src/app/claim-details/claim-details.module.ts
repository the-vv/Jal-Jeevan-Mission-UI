import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimDetailsRoutingModule } from './claim-details-routing.module';
import { ClaimDetailsComponent } from './claim-details.component';
import { CommonModulesModule } from '../common.module';
import { SharedModule } from '../shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';


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
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: environment.DATE_FORMATS },
  ]
})
export class ClaimDetailsModule { }

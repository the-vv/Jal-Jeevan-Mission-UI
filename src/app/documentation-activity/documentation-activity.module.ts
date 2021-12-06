import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationActivityRoutingModule } from './documentation-activity-routing.module';
import { DocumentationActivityComponent } from './documentation-activity.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModulesModule } from '../common.module';
import { ConfirmationService } from 'primeng/api';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    DocumentationActivityComponent
  ],
  imports: [
    CommonModule,
    DocumentationActivityRoutingModule,
    SharedModule,
    CommonModulesModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: environment.DATE_FORMATS },
    ConfirmationService,
  ],
  exports: [
    DocumentationActivityComponent
  ]
})
export class DocumentationActivityModule { }

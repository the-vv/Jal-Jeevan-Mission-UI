import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationActivityRoutingModule } from './documentation-activity-routing.module';
import { DocumentationActivityComponent } from './documentation-activity.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModulesModule } from '../common.module';
import { ConfirmationService } from 'primeng/api';


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
    ConfirmationService,
  ],
  exports: [
    DocumentationActivityComponent
  ]
})
export class DocumentationActivityModule { }

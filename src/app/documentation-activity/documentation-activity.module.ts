import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationActivityRoutingModule } from './documentation-activity-routing.module';
import { DocumentationActivityComponent } from './documentation-activity.component';


@NgModule({
  declarations: [
    DocumentationActivityComponent
  ],
  imports: [
    CommonModule,
    DocumentationActivityRoutingModule
  ]
})
export class DocumentationActivityModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationActivityComponent } from './documentation-activity.component';

const routes: Routes = [{ path: '', component: DocumentationActivityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationActivityRoutingModule { }
